import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../../core/services/base-api.service';
import { IProduct } from '../interfaces/IProduct';
import { IProductCategory } from '../interfaces/IProductCategory';
import { IProductQuery } from '../interfaces/IProductQuery';
import { IProductResponse } from '../interfaces/IProductResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService extends BaseApiService {
  key = 'products';

  getProducts(url = '', params?: IProductQuery): Observable<IProductResponse> {
    const queryParams: string = this.getParams([
      ['q', params?.q],
      ['limit', params?.limit],
      ['skip', params?.skip],
      ['sortBy', params?.sortBy],
      ['order', params?.order],
    ]);
    const query: string = queryParams ? `?${queryParams}` : '';

    return this.http.get<IProductResponse>(this.getUrl(`${url}${query}`));
  }

  getProductById(productId: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.getUrl(`/${productId}`));
  }

  getCategories(): Observable<IProductCategory[]> {
    return this.http.get<IProductCategory[]>(this.getUrl('/categories'));
  }
}
