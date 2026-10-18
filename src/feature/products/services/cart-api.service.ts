import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../../core/services/base-api.service';
import { ICart } from '../interfaces/ICart';
import { ICartProduct } from '../interfaces/ICartProduct';

@Injectable({
  providedIn: 'root',
})
export class CartApiService extends BaseApiService {

  key = 'carts';

  addCart(products: ICartProduct[]): Observable<ICart> {
    return this.http.post<ICart>(this.getUrl('/add'), { userId: 1, products });
  }

  updateCart(cartId: number, products: ICartProduct[]): Observable<ICart> {
    return this.http.put<ICart>(this.getUrl(`/${ cartId }`), {
      merge: false,
      products,
    });
  }

  deleteCart(cartId: number): Observable<ICart> {
    return this.http.delete<ICart>(this.getUrl(`/${ cartId }`));
  }

}
