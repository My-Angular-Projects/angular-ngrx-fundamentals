import { Product } from './product.interface';

export interface IProductsState {
  products: Product[];
  showProductCode: boolean;
  errorMessage: string;
  loading: boolean;
  total: number;
}
