import { IProductsState } from '../interfaces';
import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductsActions, ProductsAPIActions } from './products.action';

export const initialState: IProductsState = {
  products: [],
  showProductCode: true,
  errorMessage: '',
  loading: false,
  total: 0,
};

const productsReducer = createReducer(
  initialState,
  on(ProductsActions.toggleShowProductCode, (state: IProductsState) => ({
    ...state,
    showProductCode: !state.showProductCode,
  })),
  on(ProductsActions.loadProducts, (state: IProductsState) => ({
    ...state,
    loading: true,
  })),
  on(
    ProductsAPIActions.productsLoadedSuccess,
    (state: IProductsState, { products }) => ({
      ...state,
      loading: false,
      products,
    }),
  ),
  on(
    ProductsAPIActions.productsLoadedFail,
    (state: IProductsState, { message }) => ({
      ...state,
      loading: false,
      errorMessage: message,
    }),
  ),
);

export const productsFeature = createFeature({
  name: 'products',
  reducer: productsReducer,
});
