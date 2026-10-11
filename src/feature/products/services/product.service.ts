import { DestroyRef, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { catchError, combineLatest, EMPTY, finalize, map, Observable, switchMap, tap } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';
import { IProductCategory } from '../interfaces/IProductCategory';
import { IProductResponse } from '../interfaces/IProductResponse';
import { ProductSortField } from '../enums/ProductSortField';
import { SortOrder } from '../enums/SortOrder';
import { ProductApiService } from './product-api.service';

@Injectable()
export class ProductService {

  private destroyRef: DestroyRef = inject(DestroyRef);
  private productApiService: ProductApiService = inject(ProductApiService);

  products: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  categories: WritableSignal<IProductCategory[]> = signal<IProductCategory[]>([]);
  search: WritableSignal<string> = signal<string>('');
  selectedCategory: WritableSignal<string | null> = signal<string | null>(null);
  skip: WritableSignal<number> = signal<number>(0);
  limit: WritableSignal<number> = signal<number>(10);
  sortField: WritableSignal<ProductSortField> = signal<ProductSortField>(ProductSortField.TITLE);
  sortOrder: WritableSignal<SortOrder> = signal<SortOrder>(SortOrder.ASC);
  totalRecords: WritableSignal<number> = signal<number>(0);
  isLoading: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {
    combineLatest([
      toObservable(this.search),
      toObservable(this.selectedCategory),
      toObservable(this.skip),
      toObservable(this.limit),
      toObservable(this.sortField),
      toObservable(this.sortOrder),
    ])
      .pipe(
        switchMap(([search, category, skip, limit, sortField, sortOrder]) =>
          this.getProductsRequest(search, category, skip, limit, sortField, sortOrder),
        ),
        tap((r: IProductResponse) => {
          this.products.set(r.products);
          this.totalRecords.set(r.total);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  setSearch(search: string): void {
    this.search.set(search.trim());
    this.skip.set(0);
  }

  setCategory(category: string | null): void {
    this.selectedCategory.set(category);
    this.skip.set(0);
  }

  setSorting(sortField: ProductSortField, sortOrder: SortOrder): void {
    this.sortField.set(sortField);
    this.sortOrder.set(sortOrder);
    this.skip.set(0);
  }

  loadCategories(): void {
    this.productApiService
      .getCategories()
      .pipe(
        tap((c: IProductCategory[]) => this.categories.set(c)),
        catchError(() => {
          this.categories.set([]);
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private getProductsRequest(
    search: string,
    category: string | null,
    skip: number,
    limit: number,
    sortField: ProductSortField,
    sortOrder: SortOrder,
  ): Observable<IProductResponse> {
    this.isLoading.set(true);

    return this.getProducts(search, category, skip, limit, sortField, sortOrder)
      .pipe(
        catchError(() => {
          this.products.set([]);
          this.totalRecords.set(0);
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false)),
      );
  }

  private getProducts(
    search: string,
    category: string | null,
    skip: number,
    limit: number,
    sortField: ProductSortField,
    sortOrder: SortOrder,
  ): Observable<IProductResponse> {
    switch (true) {
      case search.length > 0 && category !== null:
        return this.productApiService
          .getAllProductsBySearch(search, sortField, sortOrder)
          .pipe(
            map((r: IProductResponse) =>
              this.filterProductsByCategory(r.products, category, skip, limit),
            ),
          );
      case search.length > 0:
        return this.productApiService.getProductsBySearch(search, limit, skip, sortField, sortOrder);
      case category !== null:
        return this.productApiService.getProductsByCategory(category, limit, skip, sortField, sortOrder);
      default:
        return this.productApiService.getProducts(limit, skip, sortField, sortOrder);
    }
  }

  private filterProductsByCategory(
    products: IProduct[],
    category: string,
    skip: number,
    limit: number,
  ): IProductResponse {
    const filteredProducts: IProduct[] = products.filter((p: IProduct) => p.category === category);
    const productsForPage: IProduct[] = filteredProducts.filter(
      (_: IProduct, index: number) => index >= skip && index < skip + limit,
    );

    return {
      products: productsForPage,
      total: filteredProducts.length,
      skip,
      limit,
    };
  }

}
