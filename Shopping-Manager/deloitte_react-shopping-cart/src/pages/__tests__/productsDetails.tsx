import React from 'react';
import ProductDetails from '../productDetails';
import { render } from '@testing-library/react';
import { ProductsProvider } from '../../context/productsContext';
import { CartProvider } from '../../context/cartContext';
import { BrowserRouter } from 'react-router-dom';

const setup = (props = {}) => {
  return render(
    <ProductsProvider>
      <CartProvider>
        <ProductDetails {...props} />
      </CartProvider>
    </ProductsProvider>,
    { wrapper: BrowserRouter },
  );
};

describe('test ProductsDetails Component', () => {
  beforeEach(() => {
    setup();
  });
});
