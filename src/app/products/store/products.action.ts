import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../interfaces';

export const ProductsActionGroup = createActionGroup({
  source: 'Products',
  events: {
    'Toggle Show Product Code': emptyProps(),
    'Load Products': emptyProps(),
  },
});

export const ProductsAPIAction = createActionGroup({
  source: 'Products API',
  events: {
    'Products Loaded Success': props<{ products: Product[] }>(),
  },
});
