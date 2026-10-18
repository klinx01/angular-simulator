import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { catchError, EMPTY, finalize, Observable, tap } from 'rxjs';
import { MessageService } from '../../../core/message/services/message.service';
import { ICart } from '../interfaces/ICart';
import { ICartItem } from '../interfaces/ICartItem';
import { ICartProduct } from '../interfaces/ICartProduct';
import { IProduct } from '../interfaces/IProduct';
import { CartApiService } from './cart-api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartApiService: CartApiService = inject(CartApiService);
  private messageService: MessageService = inject(MessageService);

  private itemsSignal: WritableSignal<ICartItem[]> = signal<ICartItem[]>([]);
  private cartIdSignal: WritableSignal<number | null> = signal<number | null>(null);
  private isLoadingSignal: WritableSignal<boolean> = signal<boolean>(false);

  readonly items: Signal<ICartItem[]> = this.itemsSignal.asReadonly();
  readonly cartId: Signal<number | null> = this.cartIdSignal.asReadonly();
  readonly isLoading: Signal<boolean> = this.isLoadingSignal.asReadonly();
  readonly taxRate: number = 0.2;

  readonly itemsCount: Signal<number> = computed(() =>
    this.itemsSignal().reduce((count: number, i: ICartItem) => count + i.quantity, 0),
  );

  readonly subtotal: Signal<number> = computed(() =>
    this.itemsSignal().reduce((sum: number, i: ICartItem) => sum + i.price * i.quantity, 0),
  );

  readonly tax: Signal<number> = computed(() => this.subtotal() * this.taxRate);
  readonly total: Signal<number> = computed(() => this.subtotal() + this.tax());

  addProduct(product: IProduct): void {
    if (this.isLoadingSignal() || product.stock === 0) {
      return;
    }

    const currentItems: ICartItem[] = this.itemsSignal();
    const existingItem: ICartItem | undefined = currentItems.find(
      (i: ICartItem) => i.id === product.id,
    );

    if (existingItem) {
      this.setQuantity(product.id, existingItem.quantity + 1);
    } else {
      this.itemsSignal.set([...currentItems, this.createCartItem(product)]);
    }

    this.messageService.showSuccess('Товар добавлен в корзину');
  }

  updateQuantity(productId: number, quantity: number | null): void {
    if (this.isLoadingSignal() || !quantity || quantity < 1 || quantity % 1 !== 0) {
      return;
    }

    this.setQuantity(productId, quantity);
    this.messageService.showSuccess('Количество изменено');
  }

  removeProduct(productId: number): void {
    if (this.isLoadingSignal()) {
      return;
    }

    this.itemsSignal.update((items: ICartItem[]) =>
      items.filter((i: ICartItem) => i.id !== productId),
    );
    this.messageService.showSuccess('Товар удалён из корзины');
  }

  saveCart(): void {
    if (this.isLoadingSignal() || !this.itemsSignal().length) {
      return;
    }

    const cartId: number | null = this.cartIdSignal();
    const products: ICartProduct[] = this.getCartProducts();
    const request$: Observable<ICart> =
      cartId === null
        ? this.cartApiService.addCart(products)
        : this.cartApiService.updateCart(cartId, products);

    this.isLoadingSignal.set(true);
    request$
      .pipe(
        tap((c: ICart) => this.setSavedCart(c)),
        catchError(() => {
          this.messageService.showError('Не удалось сохранить корзину. Товары остались в корзине');
          return EMPTY;
        }),
        finalize(() => this.isLoadingSignal.set(false)),
      )
      .subscribe();
  }

  deleteCart(): void {
    if (this.isLoadingSignal()) {
      return;
    }

    const cartId: number | null = this.cartIdSignal();
    if (cartId === null) {
      this.clearCart();
      return;
    }

    this.isLoadingSignal.set(true);
    this.cartApiService
      .deleteCart(cartId)
      .pipe(
        tap(() => this.clearCart()),
        catchError(() => {
          this.messageService.showError('Не удалось удалить корзину');
          return EMPTY;
        }),
        finalize(() => this.isLoadingSignal.set(false)),
      )
      .subscribe();
  }

  private createCartItem(product: IProduct): ICartItem {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
    };
  }

  private setQuantity(productId: number, quantity: number): void {
    this.itemsSignal.update((items: ICartItem[]) =>
      items.map((i: ICartItem) => (i.id === productId ? { ...i, quantity } : i)),
    );
  }

  private getCartProducts(): ICartProduct[] {
    return this.itemsSignal().map((i: ICartItem) => ({
      id: i.id,
      quantity: i.quantity,
    }));
  }

  private setSavedCart(cart: ICart): void {
    this.cartIdSignal.set(cart.id);
    this.itemsSignal.set(cart.products);
    this.messageService.showSuccess('Корзина сохранена');
  }

  private clearCart(): void {
    this.itemsSignal.set([]);
    this.cartIdSignal.set(null);
    this.messageService.showSuccess('Корзина удалена');
  }
}
