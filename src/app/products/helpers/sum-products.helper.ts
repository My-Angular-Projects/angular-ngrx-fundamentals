import { Product } from '../interfaces/product.interface';

export const sumProducts = (products: Product[]) =>
  products.reduce((acc: number, cur) => acc + cur.price, 0);
