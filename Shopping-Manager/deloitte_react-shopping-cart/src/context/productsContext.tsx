import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import productsReducer, {
  productsInitialState,
  ProductType,
  ProductTypeEnum,
} from '../reducers/productsReducer';
import axiosInstance from '../utils/axiosInstance';

type ProductsContextType = {
  products: ProductType[];
  selectedProduct?: ProductType;
  loadProducts: () => Promise<void>;
  getProduct: (id: string) => Promise<void>;
};

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  loadProducts: async () => {},
  getProduct: async (id: string) => {},
});

export const ProductsProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(productsReducer, productsInitialState);

  const loadProducts = async () => {
    const payload = {
      type: ProductTypeEnum.LOAD_PRODUCTS,
    };
    try {
      dispatch({
        type: 'LOAD_PRODUCTS_REQUEST',
        payload,
      });
      const res = await axiosInstance.get('products');
      dispatch({ type: 'LOAD_PRODUCTS_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({
        type: 'LOAD_PRODUCTS_FAIL',
        payload: {
          ...payload,
          error: error.response.data,
        },
      });
    }
  };

  const getProduct = async (id: string) => {
    const payload = {
      type: ProductTypeEnum.LOAD_SELECTED_PRODUCT,
    };
    try {
      dispatch({
        type: 'LOAD_SELECTED_PRODUCT_REQUEST',
        payload,
      });
      const res = await axiosInstance.get(`products/${id}`);
      dispatch({ type: 'LOAD_SELECTED_PRODUCT_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({
        type: 'LOAD_SELECTED_PRODUCT_FAIL',
        payload: {
          ...payload,
          error: error.response.data,
        },
      });
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      loadProducts,
      getProduct,
    }),
    [state],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
