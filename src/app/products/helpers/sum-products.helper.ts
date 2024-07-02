import { Product } from '../interfaces';

export const sumProducts = (products: Product[]): number =>
  products.reduce((sum: number, product: Product) => sum + product.price, 0);
