import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction('[Product] Toggle Product Code');

// Props function is used to define the structure of the action's data

export const setCurrentProduct = createAction(
  '[Product] Set CurrentProduct',
  props<{ currentProductId: number }>()
);

export const clearCurrentProduct = createAction(
  '[Product] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
  '[Product] Initialize Current Product'
);

export const loadProducts = createAction('[Product] Load');

export const loadProductsSuccess = createAction(
  '[Product] Load Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Failure',
  props<{ error: string }>()
);

// action for the update action itself - it will get dispatched when the user selects to save an updated product
// this action should kick off the save to the back-end server
export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: Product }>()
);

// action for the successfull completion of the operation - it will dispatch from the reducer if the save from the back-end server was successfull
export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ product: Product }>()
);

// action for an error or failure - it will dispatch from the reducer if the save from the back-end server was not successfull
export const updateProductFailure = createAction(
  '[Product] Update Product Fail',
  props<{ error: string}>()
);

export const addNewProduct = createAction(
  '[Product] Add New Product',
  props<{ product: Product }>()
)

export const addNewProductSuccess = createAction(
  '[Product] Add New Product Success',
  props<{ product: Product }>()
)

export const addNewProductFailure = createAction(
  '[Product] Add New Product Failure',
  props<{ error: string }>()
)

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ productId: number }>()
)

export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success',
  props<{ productId: number }>()
)

export const deleteProductFailure = createAction(
  '[Product] Delete Product Failure',
  props<{ error: string }>()
)
