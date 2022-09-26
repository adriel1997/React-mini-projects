import { AppState } from '../container/todo/todoTypes';

export const productsInitialState = {
  products: [],
  appState: [],
};

export enum ProductTypeEnum {
  LOAD_PRODUCTS,
  LOAD_SELECTED_PRODUCT,
}

type ProductsReducerType = {
  products: ProductType[];
  appState: AppState<ProductTypeEnum>[];
  selectedProduct?: ProductType;
};

type Rating = {
  rate: number;
  count: number;
};

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

type LoadProductsRequest = {
  type: 'LOAD_PRODUCTS_REQUEST';
  payload: {
    type: ProductTypeEnum;
  };
};

type LoadProductsSuccess = {
  type: 'LOAD_PRODUCTS_SUCCESS';
  payload: ProductType[];
};

type LoadProductsFail = {
  type: 'LOAD_PRODUCTS_FAIL';
  payload: {
    error: string;
    type: ProductTypeEnum;
  };
};

type LoadSelectedProductRequest = {
  type: 'LOAD_SELECTED_PRODUCT_REQUEST';
  payload: {
    type: ProductTypeEnum;
  };
};

type LoadSelectedProductSuccess = {
  type: 'LOAD_SELECTED_PRODUCT_SUCCESS';
  payload: ProductType;
};

type LoadSelectedProductFail = {
  type: 'LOAD_SELECTED_PRODUCT_FAIL';
  payload: {
    error: string;
    type: ProductTypeEnum;
  };
};

type ProductsActionType =
  | LoadProductsRequest
  | LoadProductsSuccess
  | LoadProductsFail
  | LoadSelectedProductRequest
  | LoadSelectedProductSuccess
  | LoadSelectedProductFail;

export default (
  state: ProductsReducerType,
  { type, payload }: ProductsActionType,
): ProductsReducerType => {
  switch (type) {
    case 'LOAD_PRODUCTS_REQUEST':
    case 'LOAD_SELECTED_PRODUCT_REQUEST': {
      return {
        ...state,
        appState: [
          ...state.appState,
          { id: -1, isLoading: true, type: payload.type },
        ],
      };
    }

    case 'LOAD_PRODUCTS_SUCCESS': {
      return {
        ...state,
        products: payload,
        appState: state.appState.filter(
          (x) => x.type === ProductTypeEnum.LOAD_PRODUCTS,
        ),
      };
    }

    case 'LOAD_SELECTED_PRODUCT_SUCCESS': {
      return {
        ...state,
        selectedProduct: payload,
        appState: state.appState.filter(
          (x) => x.type === ProductTypeEnum.LOAD_SELECTED_PRODUCT,
        ),
      };
    }

    case 'LOAD_PRODUCTS_FAIL':
    case 'LOAD_SELECTED_PRODUCT_FAIL': {
      return {
        ...state,
        appState: state.appState.map((x) => {
          if (x.type === payload.type) {
            return {
              ...x,
              isLoading: false,
              hasError: true,
              errorMessage: payload.error,
            };
          }
          return x;
        }),
      };
    }

    default:
      return state;
  }
};
