import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';
import { IProductCategory } from '../interfaces/IProductCategory';
import { IProductResponse } from '../interfaces/IProductResponse';
import { ProductSortField } from '../enums/ProductSortField';
import { SortOrder } from '../enums/SortOrder';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {

  private http: HttpClient = inject(HttpClient);
  private readonly productsUrl: string = 'https://dummyjson.com/products';

  getProducts(
    limit: number,
    skip: number,
    sortField: ProductSortField,
    sortOrder: SortOrder,
  ): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(
      this.productsUrl,
      { params: { limit, skip, sortBy: sortField, order: sortOrder } },
    );
  }

  getProductsBySearch(
    search: string,
    limit: number,
    skip: number,
    sortField: ProductSortField,
    sortOrder: SortOrder,
  ): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(
      `${ this.productsUrl }/search`,
      { params: { q: search, limit, skip, sortBy: sortField, order: sortOrder } },
    );
  }

  getAllProductsBySearch(
    search: string,
    sortField: ProductSortField,
    sortOrder: SortOrder,
  ): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(
      `${ this.productsUrl }/search`,
      { params: { q: search, limit: 0, sortBy: sortField, order: sortOrder } },
    );
  }

  getProductsByCategory(
    category: string,
    limit: number,
    skip: number,
    sortField: ProductSortField,
    sortOrder: SortOrder,
  ): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(
      `${ this.productsUrl }/category/${ category }`,
      { params: { limit, skip, sortBy: sortField, order: sortOrder } },
    );
  }

  getProductById(productId: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${ this.productsUrl }/${ productId }`);
  }

  getCategories(): Observable<IProductCategory[]> {
    return this.http.get<IProductCategory[]>(`${ this.productsUrl }/categories`);
  }

}
