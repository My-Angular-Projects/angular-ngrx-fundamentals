import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductsActions, ProductsAPIActions } from './products.action';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';

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
