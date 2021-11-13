import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { merge, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });

  // define a property for the observable of action returned from createEffect
  // in the return statement, respond to any dispatched action
  // each time an action is dispatched, use ofType filter to filter out all but the updateProduct action
  // if a dispatched action is of updateProduct - call the productService.updateProduct method and pass in the
  // - the updated product associated with teh action
  // - which issues the HTTP PUT request to update the product on the back-end server
  // The updateProduct method also returns an observable, since we don't want nested observables we use an higher-order observer such as concatMap
  // - to merge and flatten the two observables - the one from teh action and the one returned from the updateProduct method
  // if the update is success, we dispatch the updateProductSuccess action along with the updated product
  // if it failes, we dispatch the updateProductFailure update along with the error text
  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      concatMap((action) =>
        this.productService.updateProduct(action.product).pipe(
          map((product) => ProductActions.updateProductSuccess({ product })),
          catchError((error) =>
            of(ProductActions.updateProductFailure({ error }))
          )
        )
      )
    );
  });

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.addNewProduct),
      concatMap((action) =>
        this.productService.createProduct(action.product).pipe(
          map((product) => ProductActions.addNewProductSuccess({ product })),
          catchError((error) =>
            of(ProductActions.addNewProductFailure({ error }))
          )
        )
      )
    );
  });
}
