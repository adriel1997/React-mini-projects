import { AppState } from '../container/todo/todoTypes';

export const cartInitialState = {
  cart: [],
  appState: [],
};

export enum CartTypeEnum {
  LOAD_CART,
  ADD_CART,
  UPDATE_CART,
  DELETE_CART,
}

type CartReducerType = {
  cart: CartType[];
  appState: AppState<CartTypeEnum>[];
};

type Rating = {
  rate: number;
  count: number;
};

export type CartType = {
  id: number;
  productId: number;
  quantity: number;
};

type LoadCartRequest = {
  type: 'LOAD_CART_REQUEST';
  payload: {
    type: CartTypeEnum;
    id: number;
  };
};

type LoadCartSuccess = {
  type: 'LOAD_CART_SUCCESS';
  payload: CartType[];
};

type LoadCartFail = {
  type: 'LOAD_CART_FAIL';
  payload: {
    error: string;
    type: CartTypeEnum;
    id: number;
  };
};

type AddCartRequest = {
  type: 'ADD_CART_REQUEST';
  payload: {
    type: CartTypeEnum;
    id: number;
  };
};

type AddCartSuccess = {
  type: 'ADD_CART_SUCCESS';
  payload: CartType;
};

type AddCartFail = {
  type: 'ADD_CART_FAIL';
  payload: {
    error: string;
    type: CartTypeEnum;
    id: number;
  };
};

type UpdateCartRequest = {
  type: 'UPDATE_CART_REQUEST';
  payload: {
    type: CartTypeEnum;
    id: number;
  };
};

type UpdateCartSuccess = {
  type: 'UPDATE_CART_SUCCESS';
  payload: CartType;
};

type UpdateCartFail = {
  type: 'UPDATE_CART_FAIL';
  payload: {
    error: string;
    type: CartTypeEnum;
    id: number;
  };
};

type DeleteCartRequest = {
  type: 'DELETE_CART_REQUEST';
  payload: {
    type: CartTypeEnum;
    id: number;
  };
};

type DeleteCartSuccess = {
  type: 'DELETE_CART_SUCCESS';
  payload: CartType;
};

type DeleteCartFail = {
  type: 'DELETE_CART_FAIL';
  payload: {
    error: string;
    type: CartTypeEnum;
    id: number;
  };
};

type CartActionType =
  | LoadCartRequest
  | LoadCartSuccess
  | LoadCartFail
  | AddCartRequest
  | AddCartSuccess
  | AddCartFail
  | UpdateCartRequest
  | UpdateCartSuccess
  | UpdateCartFail
  | DeleteCartRequest
  | DeleteCartSuccess
  | DeleteCartFail;

export default (
  state: CartReducerType,
  { type, payload }: CartActionType,
): CartReducerType => {
  switch (type) {
    case 'LOAD_CART_REQUEST':
    case 'ADD_CART_REQUEST':
    case 'UPDATE_CART_REQUEST':
    case 'DELETE_CART_REQUEST': {
      return {
        ...state,
        appState: [
          ...state.appState,
          { id: payload.id, isLoading: true, type: payload.type },
        ],
      };
    }

    case 'LOAD_CART_SUCCESS': {
      return {
        ...state,
        cart: payload,
        appState: state.appState.filter(
          (x) => x.type !== CartTypeEnum.LOAD_CART,
        ),
      };
    }

    case 'ADD_CART_SUCCESS': {
      return {
        ...state,
        cart: [...state.cart, payload],
        appState: state.appState.filter(
          (x) => !(x.type === CartTypeEnum.ADD_CART && x.id === payload.id),
        ),
      };
    }

    case 'UPDATE_CART_SUCCESS': {
      const index = state.cart.findIndex((x) => x.id === payload.id);
      return {
        ...state,
        cart: [
          ...state.cart.slice(0, index),
          payload,
          ...state.cart.slice(index + 1),
        ],
        appState: state.appState.filter(
          (x) =>
            !(
              x.type === CartTypeEnum.UPDATE_CART && x.id === payload.productId
            ),
        ),
      };
    }

    case 'DELETE_CART_SUCCESS': {
      const index = state.cart.findIndex((x) => x.id === payload.id);
      return {
        ...state,
        cart: [...state.cart.slice(0, index), ...state.cart.slice(index + 1)],
        appState: state.appState.filter(
          (x) =>
            !(
              x.type === CartTypeEnum.DELETE_CART && x.id === payload.productId
            ),
        ),
      };
    }

    case 'LOAD_CART_FAIL':
    case 'ADD_CART_FAIL':
    case 'UPDATE_CART_FAIL':
    case 'DELETE_CART_FAIL': {
      return {
        ...state,
        appState: state.appState.map((x) => {
          if (x.type === payload.type && x.id === payload.id) {
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
