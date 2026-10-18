import { ProductSortField } from '../enums/ProductSortField';
import { SortOrder } from '../enums/SortOrder';

export interface IProductQuery {
  q?: string;
  limit?: number;
  skip?: number;
  sortBy?: ProductSortField;
  order?: SortOrder;
}
