import { IProductsState, Product } from '../interfaces';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ProductsActions, ProductsAPIActions } from './products.action';
import { sumProducts } from '../helpers/sum-products.helper';
import { getRouterSelectors } from '@ngrx/router-store';

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
  on(ProductsActions.addProduct, (state: IProductsState) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(
    ProductsAPIActions.addProductSuccess,
    (state: IProductsState, { product }) => ({
      ...state,
      loading: false,
      products: [...state.products, product],
      errorMessage: '',
    }),
  ),
  on(
    ProductsAPIActions.addProductFail,
    (state: IProductsState, { message }) => ({
      ...state,
      loading: false,
      errorMessage: message,
    }),
  ),
  on(ProductsActions.updateProduct, (state: IProductsState) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(
    ProductsAPIActions.updateProductSuccess,
    (state: IProductsState, { product }) => ({
      ...state,
      loading: false,
      products: state.products.map((existingProduct: Product) =>
        existingProduct.id === product.id ? product : existingProduct,
      ),
      errorMessage: '',
    }),
  ),
  on(
    ProductsAPIActions.updateProductFail,
    (state: IProductsState, { message }) => ({
      ...state,
      loading: false,
      errorMessage: message,
    }),
  ),
  on(ProductsActions.removeProduct, (state: IProductsState) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),
  on(
    ProductsAPIActions.removeProductSuccess,
    (state: IProductsState, { id }) => ({
      ...state,
      loading: false,
      products: state.products.filter(
        (existingProduct: Product) => existingProduct.id !== id,
      ),
    }),
  ),
  on(
    ProductsAPIActions.removeProductFail,
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
  extraSelectors: ({ selectProducts }) => {
    const { selectRouteParams } = getRouterSelectors();

    const selectProductsSum = createSelector(
      selectProducts,
      (products: Product[]) => sumProducts(products),
    );

    const selectByProductId = createSelector(
      selectProducts,
      selectRouteParams,
      (products: Product[], { id }) =>
        products.find((product: Product) => product.id === parseInt(id)),
    );
    return { selectProductsSum, selectByProductId };
  },
});
