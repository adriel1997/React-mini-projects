import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { ProductsContext } from '../context/productsContext';
import CartButtons from '../container/cartButtons';
import Ratting from '../component/ratting';

type Props = {};

const ProductDetails = (props: Props) => {
  let { productId } = useParams();
  const { getProduct, selectedProduct } = useContext(ProductsContext);

  useEffect(() => {
    if (productId) {
      getProduct(productId);
    }
  }, []);

  if (!selectedProduct) {
    return <h1>Product Not available</h1>;
  }

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
        <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            className="object-cover object-center"
          />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
            {selectedProduct.title}
          </h2>

          <section aria-labelledby="information-heading" className="mt-2">
            <h3 id="information-heading">{selectedProduct.description}</h3>

            <p className="text-2xl text-gray-900">
              {new Intl.NumberFormat('en-IN', {
                currency: 'INR',
                style: 'currency',
              }).format(selectedProduct.price)}
            </p>

            {/* Reviews */}
            <Ratting {...selectedProduct.rating} displayReviewCount />
          </section>

          <div className="my-6">
            <CartButtons product={selectedProduct} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
