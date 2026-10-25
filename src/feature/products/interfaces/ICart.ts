import { ICartItem } from './ICartItem';

export interface ICart {
  id: number;
  products: ICartItem[];
}
