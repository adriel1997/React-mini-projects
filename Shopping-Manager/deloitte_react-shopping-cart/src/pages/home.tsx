import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { StarIcon } from '@heroicons/react/20/solid';
import { ProductsContext } from '../context/productsContext';
import { CartContext } from '../context/cartContext';
import { CartTypeEnum } from '../reducers/cartReducer';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CartButtons from '../container/cartButtons';
import Ratting from '../component/ratting';

type Props = {};

const Home = (props: Props) => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div>
              <Link to={`${product.id}`} key={product.id} className="group">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-700 line-clamp-1">
                  {product.title}
                </h3>
                <div className="flex justify-between items-center my-2">
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                    }).format(product.price)}
                  </p>
                  <Ratting {...product.rating} />
                </div>
              </Link>
              <CartButtons product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
