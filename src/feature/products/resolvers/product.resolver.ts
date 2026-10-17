import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { catchError, of } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';
import { ProductApiService } from '../services/product-api.service';

export const productResolver: ResolveFn<IProduct | null> = (route: ActivatedRouteSnapshot) => {
  const productApiService: ProductApiService = inject(ProductApiService);
  const productId = Number(route.paramMap.get('id'));

  if (!productId || productId < 1 || productId % 1 !== 0) {
    return of(null);
  }

  return productApiService.getProductById(productId).pipe(catchError(() => of(null)));
};
