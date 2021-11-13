import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as AppState from '../../state/app.state';
import * as ProductActions from './product.actions';
import { Product } from '../product';
import { ProductService } from '../product.service';
// reducers define the state of a store

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: '',
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getError = createSelector(
  getProductFeatureState,
  (state) => state.error
);

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state) => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState, // compose selector from the getProductFeatureState selelctor which provides the product slice of state
  getCurrentProductId, // compose selector from the getProductId selector which provides the ID of the currently selected product
  (state, getCurrentProductId) => {
    if (getCurrentProductId === 0) {
      // check for product ID of 0, if there is an ID of 0, then assume a new product with no ID defined and return default values
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0,
      };
    } else {
      // otherwise, check current ID and find the product in the list and return it, otherwise null
      return getCurrentProductId
        ? state.products.find((product) => product.id === getCurrentProductId)
        : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.currentProductId,
    };
  }),
  on(ProductActions.clearCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: null,
    };
  }),
  on(ProductActions.initializeCurrentProduct, (state) => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),
  on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: '',
    };
  }),
  on(ProductActions.loadProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  }),
  on(ProductActions.updateProductSuccess, (state, action): ProductState => {
    const updatedProducts = state.products.map((item) =>
      action.product.id === item.id ? action.product : item
    );
    return {
      ...state,
      products: updatedProducts,
      currentProductId: action.product.id,
      error: '',
    };
  }),
  on(ProductActions.updateProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ProductActions.addNewProductSuccess, (state, action): ProductState => {
    const newProduct = [...state.products, action.product]
    return {
      ...state,
      products: newProduct,
      currentProductId: action.product.id,
      error: ''
    }
  }),
  on(ProductActions.addNewProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    }
  }),
  on(ProductActions.deleteProductSuccess, (state, action): ProductState => {
    const products = state.products.filter(item => item.id !== action.productId)
    return {
      ...state,
      products: products,
      currentProductId: null,
      error: ''
    }
  }),
  on(ProductActions.deleteProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    }
  })
);
