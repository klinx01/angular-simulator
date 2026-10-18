import { CurrencyPipe, PercentPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { CartService } from '../services/cart.service';
import { ICartItem } from '../interfaces/ICartItem';

@Component({
  selector: 'app-cart',
  imports: [
    CurrencyPipe,
    PercentPipe,
    FormsModule,
    ButtonModule,
    InputNumberModule,
    SkeletonModule,
    TableModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private router: Router = inject(Router);
  cartService: CartService = inject(CartService);
  mockData: ICartItem[] = Array(10).fill(1);
  redirectToCatalog(): void {
    this.router.navigate(['/products']);
  }

  redirectToDetailProduct(id: number): void {
    this.router.navigate(['/products/', id]);
  }
}
