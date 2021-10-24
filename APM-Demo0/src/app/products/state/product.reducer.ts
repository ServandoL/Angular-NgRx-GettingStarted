import { createAction, createReducer, on } from "@ngrx/store";

// reducers define the state of a store

export const productReducer = createReducer(
  { showProductCode: true },
  on(createAction('[Product] Toggle Product Code'), state => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    }
  })
);
