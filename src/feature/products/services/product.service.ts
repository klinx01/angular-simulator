import {
  computed,
  inject,
  Injectable,
  linkedSignal,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductSortField } from '../enums/ProductSortField';
import { SortOrder } from '../enums/SortOrder';
import { IProduct } from '../interfaces/IProduct';
import { IProductCategory } from '../interfaces/IProductCategory';
import { IProductQuery } from '../interfaces/IProductQuery';
import { ProductApiService } from './product-api.service';

@Injectable()
export class ProductService {

  private productApiService: ProductApiService = inject(ProductApiService);

  private searchSignal: WritableSignal<string> = signal<string>('');
  private selectedCategorySignal: WritableSignal<string | null> = signal<string | null>(null);
  private limitSignal: WritableSignal<number> = signal<number>(10);
  private sortFieldSignal: WritableSignal<ProductSortField> = signal<ProductSortField>(
    ProductSortField.TITLE,
  );

  private sortOrderSignal: WritableSignal<SortOrder> = signal<SortOrder>(SortOrder.ASC);
  private skipSignal: WritableSignal<number> = linkedSignal(() => {
    this.searchSignal();
    this.selectedCategorySignal();
    this.limitSignal();
    this.sortFieldSignal();
    this.sortOrderSignal();

    return 0;
  });

  private query: Signal<IProductQuery> = computed(() => ({
    q: this.searchSignal(),
    category: this.selectedCategorySignal() || undefined,
    limit: this.limitSignal(),
    skip: this.skipSignal(),
    sortBy: this.sortFieldSignal(),
    order: this.sortOrderSignal(),
  }));

  private productsResource = rxResource({
    params: () => this.query(),
    stream: ({ params }) => this.productApiService.getProducts(params),
  });

  private categoriesResource = rxResource({
    stream: () => this.productApiService.getCategories(),
  });

  readonly products: Signal<IProduct[]> = computed(() =>
    this.productsResource.hasValue() ? this.productsResource.value().products : [],
  );

  readonly categories: Signal<IProductCategory[]> = computed(() =>
    this.categoriesResource.hasValue() ? this.categoriesResource.value() : [],
  );

  readonly search: Signal<string> = this.searchSignal.asReadonly();
  readonly selectedCategory: Signal<string | null> = this.selectedCategorySignal.asReadonly();
  readonly skip: Signal<number> = this.skipSignal.asReadonly();
  readonly limit: Signal<number> = this.limitSignal.asReadonly();
  readonly sortField: Signal<ProductSortField> = this.sortFieldSignal.asReadonly();
  readonly sortOrder: Signal<SortOrder> = this.sortOrderSignal.asReadonly();
  readonly totalRecords: Signal<number> = computed(() =>
    this.productsResource.hasValue() ? this.productsResource.value().total : 0,
  );

  readonly isLoading: Signal<boolean> = this.productsResource.isLoading;

  setSearch(search: string): void {
    this.searchSignal.set(search.trim());
  }

  setCategory(category: string | null): void {
    this.selectedCategorySignal.set(category);
  }

  setPagination(skip: number, limit: number): void {
    if (limit !== this.limitSignal()) {
      this.limitSignal.set(limit);
      return;
    }

    this.skipSignal.set(skip);
  }

  setSorting(sortField: ProductSortField, sortOrder: SortOrder): void {
    this.sortFieldSignal.set(sortField);
    this.sortOrderSignal.set(sortOrder);
  }

}
