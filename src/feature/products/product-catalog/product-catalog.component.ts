import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';
import { ProductSortField } from '../enums/ProductSortField';
import { SortOrder } from '../enums/SortOrder';
import { ISortOption } from '../interfaces/ISortOption';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-catalog',
  imports: [
    CurrencyPipe,
    FontAwesomeModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    SkeletonModule,
    TableModule,
  ],
  templateUrl: './product-catalog.component.html',
  styleUrl: './product-catalog.component.scss',
  providers: [ProductService],
})
export class ProductCatalogComponent implements OnInit {

  private destroyRef: DestroyRef = inject(DestroyRef);
  private router: Router = inject(Router);

  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);
  searchControl: FormControl<string | null> = new FormControl<string | null>('');
  faCartShopping: IconDefinition = faCartShopping;
  mockData: IProduct[] = Array(10).fill(1);
  readonly sortFields: ISortOption<ProductSortField>[] = [
    { label: 'Название', value: ProductSortField.TITLE },
    { label: 'Цена', value: ProductSortField.PRICE },
    { label: 'Рейтинг', value: ProductSortField.RATING },
    { label: 'Остаток', value: ProductSortField.STOCK },
  ];

  readonly sortOrders: ISortOption<SortOrder>[] = [
    { label: 'По возрастанию', value: SortOrder.ASC },
    { label: 'По убыванию', value: SortOrder.DESC },
  ];

  redirectToCart(): void {
    this.router.navigate(['/products/cart']);
  }

  redirectToDetailProduct(id: number): void {
    this.router.navigate(['/products/', id]);
  }

  ngOnInit(): void {
    this.productService.loadCategories();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((search: string | null) => this.productService.setSearch(search || '')),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  onNextPage(event: TableLazyLoadEvent): void {
    this.productService.skip.set(event.first ?? 0);
    this.productService.limit.set(event.rows ?? 10);
  }

  onSortFieldChange(sortField: ProductSortField): void {
    this.productService.setSorting(sortField, this.productService.sortOrder());
  }

  onSortOrderChange(sortOrder: SortOrder): void {
    this.productService.setSorting(this.productService.sortField(), sortOrder);
  }

}
