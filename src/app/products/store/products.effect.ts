import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductsActions, ProductsAPIActions } from './products.action';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { Router } from '@angular/router';

export const productsLoadEffect = createEffect(
  (actions$ = inject(Actions), productsService = inject(ProductsService)) =>
    actions$.pipe(
      ofType(ProductsActions.loadProducts),
      exhaustMap(() =>
        productsService.getAll().pipe(
          map((products) =>
            ProductsAPIActions.productsLoadedSuccess({ products }),
          ),
          catchError((error: Error) =>
            of(
              ProductsAPIActions.productsLoadedFail({ message: error.message }),
            ),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const productsAddEffect = createEffect(
  (actions$ = inject(Actions), productsService = inject(ProductsService)) =>
    actions$.pipe(
      ofType(ProductsActions.addProduct),
      mergeMap(({ product }) =>
        productsService.add(product).pipe(
          map((product) => ProductsAPIActions.addProductSuccess({ product })),
          catchError((error: Error) =>
            of(ProductsAPIActions.addProductFail({ message: error.message })),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const productsUpdateEffect = createEffect(
  (actions$ = inject(Actions), productsService = inject(ProductsService)) =>
    actions$.pipe(
      ofType(ProductsActions.updateProduct),
      concatMap(({ product }) =>
        productsService.update(product).pipe(
          map((product) =>
            ProductsAPIActions.updateProductSuccess({ product }),
          ),
          catchError((error: Error) =>
            of(
              ProductsAPIActions.updateProductFail({ message: error.message }),
            ),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const productsRemoveEffect = createEffect(
  (actions$ = inject(Actions), productsService = inject(ProductsService)) =>
    actions$.pipe(
      ofType(ProductsActions.removeProduct),
      mergeMap(({ id }) =>
        productsService.delete(id).pipe(
          map((product) => ProductsAPIActions.removeProductSuccess({ id })),
          catchError((error: Error) =>
            of(
              ProductsAPIActions.removeProductFail({ message: error.message }),
            ),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const productsRedirectEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(
        ProductsActions.addProduct,
        ProductsActions.updateProduct,
        ProductsActions.removeProduct,
      ),
      tap(() => router.navigate(['/products'])),
    ),
  { functional: true, dispatch: false },
);
