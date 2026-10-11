import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { catchError, EMPTY, finalize, Observable, tap } from 'rxjs';
import { ICart } from '../interfaces/ICart';
import { ICartItem } from '../interfaces/ICartItem';
import { ICartProduct } from '../interfaces/ICartProduct';
import { IProduct } from '../interfaces/IProduct';
import { TAX_RATE } from '../constants/tax-rate';
import { CartApiService } from './cart-api.service';
import { MessageService } from '../../../core/message/services/message.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartApiService: CartApiService = inject(CartApiService);
  private messageService: MessageService = inject(MessageService);

  items: WritableSignal<ICartItem[]> = signal<ICartItem[]>([]);
  cartId: WritableSignal<number | null> = signal<number | null>(null);
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  message: WritableSignal<string> = signal<string>('');

  itemsCount: Signal<number> = computed(() =>
    this.items().reduce((count: number, i: ICartItem) => count + i.quantity, 0),
  );

  subtotal: Signal<number> = computed(() =>
    this.items().reduce((sum: number, i: ICartItem) => sum + i.price * i.quantity, 0),
  );

  tax: Signal<number> = computed(() => this.subtotal() * TAX_RATE);
  total: Signal<number> = computed(() => this.subtotal() + this.tax());

  addProduct(product: IProduct): void {
    if (this.isLoading() || product.stock === 0) {
      return;
    }

    const currentItems: ICartItem[] = this.items();
    const existingItem: ICartItem | undefined = currentItems.find(
      (i: ICartItem) => i.id === product.id,
    );

    if (existingItem) {
      this.updateQuantity(product.id, existingItem.quantity + 1);
      this.messageService.showSuccess('Товар добавлен в корзину');
      return;
    }

    const newItem: ICartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
    };
    this.items.set([...currentItems, newItem]);
    this.message.set('Товар добавлен в корзину');
    this.messageService.showSuccess('Товар добавлен в корзину');
  }

  updateQuantity(productId: number, quantity: number | null): void {
    if (this.isLoading() || !quantity || quantity < 1 || quantity % 1 !== 0) {
      return;
    }

    const currentItems: ICartItem[] = this.items();
    const updatedItems: ICartItem[] = currentItems.map((i: ICartItem) =>
      i.id === productId ? { ...i, quantity } : i,
    );
    this.items.set(updatedItems);
    this.message.set('Количество изменено');
  }

  removeProduct(productId: number): void {
    if (this.isLoading()) {
      return;
    }

    const currentItems: ICartItem[] = this.items();
    const updatedItems: ICartItem[] = currentItems.filter((i: ICartItem) => i.id !== productId);
    this.items.set(updatedItems);
    this.message.set('Товар удалён из корзины');
  }

  saveCart(): void {
    if (this.isLoading() || !this.items().length) {
      return;
    }

    const cartId: number | null = this.cartId();
    const products: ICartProduct[] = this.getCartProducts();
    const request$: Observable<ICart> = cartId === null
      ? this.cartApiService.addCart(products)
      : this.cartApiService.updateCart(cartId, products);

    this.isLoading.set(true);
    this.message.set('');
    request$
      .pipe(
        tap((c: ICart) => this.setSavedCart(c)),
        catchError(() => {
          this.message.set('Не удалось сохранить корзину. Товары остались в корзине');
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe();
  }

  deleteCart(): void {
    if (this.isLoading()) {
      return;
    }

    const cartId: number | null = this.cartId();
    if (cartId === null) {
      this.clearCart();
      return;
    }

    this.isLoading.set(true);
    this.message.set('');
    this.cartApiService
      .deleteCart(cartId)
      .pipe(
        tap(() => this.clearCart()),
        catchError(() => {
          this.message.set('Не удалось удалить корзину');
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe();
  }

  private getCartProducts(): ICartProduct[] {
    return this.items().map((i: ICartItem) => ({
      id: i.id,
      quantity: i.quantity,
    }));
  }

  private setSavedCart(cart: ICart): void {
    this.cartId.set(cart.id);
    this.items.set(cart.products);
    this.message.set('Корзина сохранена');
  }

  private clearCart(): void {
    this.items.set([]);
    this.cartId.set(null);
    this.message.set('Корзина удалена');
  }

}
