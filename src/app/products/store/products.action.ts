import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../interfaces';

export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    'Toggle Show Product Code': emptyProps(),
    'Load Products': emptyProps(),
    'Add Product': props<{ product: Product }>(),
    'Update Product': props<{ product: Product }>(),
    'Remove Product': props<{ id: number }>(),
  },
});

export const ProductsAPIActions = createActionGroup({
  source: 'Products API',
  events: {
    'Products Loaded Success': props<{ products: Product[] }>(),
    'Products Loaded Fail': props<{ message: string }>(),
    'Add Product Success': props<{ product: Product }>(),
    'Add Product Fail': props<{ message: string }>(),
    'Update Product Success': props<{ product: Product }>(),
    'Update Product Fail': props<{ message: string }>(),
    'Remove Product Success': props<{ id: number }>(),
    'Remove Product Fail': props<{ message: string }>(),
  },
});
