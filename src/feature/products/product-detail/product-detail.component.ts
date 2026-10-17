import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faCartShopping,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { tap } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';
import { StockSeverity } from '../enums/StockSeverity';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [
    ButtonModule,
    CurrencyPipe,
    DatePipe,
    FormsModule,
    FontAwesomeModule,
    GalleriaModule,
    RatingModule,
    TagModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private router: Router = inject(Router);
  cartService: CartService = inject(CartService);
  product: WritableSignal<IProduct | null> = signal<IProduct | null>(null);

  faArrowLeft: IconDefinition = faArrowLeft;
  faCartShopping: IconDefinition = faCartShopping;
  faCircleExclamation: IconDefinition = faCircleExclamation;

  ngOnInit(): void {
    this.route.data
      .pipe(
        tap((data: Data) => this.product.set(data['productDetail'])),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  redirectToCatalog(): void {
    this.router.navigate(['/products']);
  }

  redirectToCart(): void {
    this.router.navigate(['/products/cart']);
  }

  getStockLabel(stock: number): string {
    if (stock === 0) {
      return 'Нет в наличии';
    }

    return stock <= 10 ? `Осталось ${ stock }` : `В наличии: ${ stock }`;
  }

  getStockSeverity(stock: number): StockSeverity {
    if (stock === 0) {
      return StockSeverity.DANGER;
    }

    return stock <= 10 ? StockSeverity.WARN : StockSeverity.SUCCESS;
  }

}
