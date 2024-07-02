import { IProductsState, Product } from '../interfaces';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ProductsActions, ProductsAPIActions } from './products.action';
import { sumProducts } from '../helpers/sum-products.helper';

export const initialState: IProductsState = {
  products: [],
  showProductCode: true,
  errorMessage: '',
  loading: false,
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
    errorMessage: '',
  })),
  on(
    ProductsAPIActions.productsLoadedSuccess,
    (state: IProductsState, { products }) => ({
      ...state,
      loading: false,
      products,
      errorMessage: '',
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
  on(
    ProductsAPIActions.addProductSuccess,
    (state: IProductsState, { product }) => ({
      ...state,
      products: [...state.products, product],
      errorMessage: '',
    }),
  ),
  on(
    ProductsAPIActions.addProductFail,
    (state: IProductsState, { message }) => ({
      ...state,
      errorMessage: message,
    }),
  ),
);

export const productsFeature = createFeature({
  name: 'products',
  reducer: productsReducer,
  extraSelectors: ({ selectProducts }) => ({
    selectProductsSum: createSelector(selectProducts, (products: Product[]) =>
      sumProducts(products),
    ),
  }),
});
