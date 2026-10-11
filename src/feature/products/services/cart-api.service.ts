import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from '../interfaces/ICart';
import { ICartProduct } from '../interfaces/ICartProduct';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {

  private http: HttpClient = inject(HttpClient);
  private readonly cartsUrl: string = 'https://dummyjson.com/carts';

  addCart(products: ICartProduct[]): Observable<ICart> {
    return this.http.post<ICart>(`${ this.cartsUrl }/add`, { userId: 1, products });
  }

  updateCart(cartId: number, products: ICartProduct[]): Observable<ICart> {
    return this.http.put<ICart>(`${ this.cartsUrl }/${ cartId }`, {
      merge: false,
      products,
    });
  }

  deleteCart(cartId: number): Observable<ICart> {
    return this.http.delete<ICart>(`${ this.cartsUrl }/${ cartId }`);
  }

}
