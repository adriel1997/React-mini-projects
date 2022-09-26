import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { AppState } from '../container/todo/todoTypes';
import cartReducer, {
  cartInitialState,
  CartType,
  CartTypeEnum,
} from '../reducers/cartReducer';
import { ProductType } from '../reducers/productsReducer';
import axiosInstance from '../utils/axiosInstance';

type CartContextType = {
  cart: CartType[];
  appState: AppState<CartTypeEnum>[];
  loadCart: () => Promise<void>;
  addToCart: (product: ProductType) => Promise<void>;
  updateCartItem: (cart: CartType) => Promise<void>;
  deleteCartItem: (cart: CartType) => Promise<void>;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  appState: [],
  loadCart: async () => {},
  addToCart: async () => {},
  updateCartItem: async () => {},
  deleteCartItem: async () => {},
});

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const loadCart = async () => {
    const payload = {
      type: CartTypeEnum.LOAD_CART,
      id: -1,
    };
    try {
      dispatch({
        type: 'LOAD_CART_REQUEST',
        payload,
      });
      const res = await axiosInstance.get('cart');
      dispatch({ type: 'LOAD_CART_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({
        type: 'LOAD_CART_FAIL',
        payload: {
          error: error.response.data,
          ...payload,
        },
      });
    }
  };

  const addToCart = async (product: ProductType) => {
    const payload = {
      type: CartTypeEnum.ADD_CART,
      id: product.id,
    };
    try {
      dispatch({
        type: 'ADD_CART_REQUEST',
        payload: payload,
      });
      const res = await axiosInstance.post('cart', {
        productId: product.id,
        quantity: 1,
      });
      dispatch({
        type: 'ADD_CART_SUCCESS',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'ADD_CART_FAIL',
        payload: {
          ...payload,
          error: error.message,
        },
      });
    }
  };

  const updateCartItem = async (cart: CartType) => {
    const payload = {
      type: CartTypeEnum.UPDATE_CART,
      id: cart.productId,
    };
    try {
      dispatch({ type: 'UPDATE_CART_REQUEST', payload });
      const res = await axiosInstance.put(`cart/${cart.id}`, cart);
      dispatch({ type: 'UPDATE_CART_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({
        type: 'UPDATE_CART_FAIL',
        payload: {
          ...payload,
          error: error.message,
        },
      });
    }
  };

  const deleteCartItem = async (cart: CartType) => {
    const payload = {
      type: CartTypeEnum.DELETE_CART,
      id: cart.productId,
    };
    try {
      dispatch({ type: 'DELETE_CART_REQUEST', payload });
      await axiosInstance.delete(`cart/${cart.id}`);
      dispatch({ type: 'DELETE_CART_SUCCESS', payload: cart });
    } catch (error) {
      dispatch({
        type: 'DELETE_CART_FAIL',
        payload: {
          ...payload,
          error: error.message,
        },
      });
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      loadCart,
      addToCart,
      updateCartItem,
      deleteCartItem,
    }),
    [state],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
