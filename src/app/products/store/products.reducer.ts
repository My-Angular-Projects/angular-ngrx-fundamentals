import { IProductsState } from '../interfaces';
import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductsActionGroup } from './products.action';

export const initialState: IProductsState = {
  products: [],
  showProductCode: true,
  errorMessage: '',
  loading: true,
};

const productsReducer = createReducer(
  initialState,
  on(ProductsActionGroup.toggleShowProductCode, (state: IProductsState) => ({
    ...state,
    showProductCode: !state.showProductCode,
  })),
);

export const productsFeature = createFeature({
  name: 'products',
  reducer: productsReducer,
});
