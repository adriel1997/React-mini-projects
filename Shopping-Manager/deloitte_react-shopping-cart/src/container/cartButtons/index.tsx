import React from 'react';
import { CartContext } from '../../context/cartContext';
import { CartTypeEnum } from '../../reducers/cartReducer';
import { ProductType } from '../../reducers/productsReducer';

type Props = {
  product: ProductType;
};

const CartButtons = ({ product }: Props) => {
  return (
    <CartContext.Consumer>
      {({ addToCart, cart, deleteCartItem, updateCartItem, appState }) => {
        const cartItem = cart.find((x) => x.productId === product.id);
        const isItemAdding = appState.find(
          (x) => x.type === CartTypeEnum.ADD_CART && x.id === product.id,
        );

        const isItemUpdating = appState.find(
          (x) =>
            (x.type === CartTypeEnum.UPDATE_CART ||
              x.type === CartTypeEnum.DELETE_CART) &&
            x.id === product.id,
        );

        return (
          <div className="flex items-center">
            {!!cartItem ? (
              <>
                <button
                  type="button"
                  disabled={!!isItemUpdating}
                  className="btn flex-1 disabled:bg-slate-400 disabled:cursor-wait"
                  onClick={() =>
                    updateCartItem({
                      ...cartItem,
                      quantity: cartItem.quantity + 1,
                    })
                  }
                >
                  +
                </button>
                <p className="flex-1 text-center text-2xl font-semibold">
                  {cartItem.quantity}
                </p>
                <button
                  type="button"
                  className="btn flex-1 disabled:bg-slate-400 disabled:cursor-wait"
                  disabled={!!isItemUpdating}
                  onClick={() => {
                    if (cartItem.quantity > 1) {
                      updateCartItem({
                        ...cartItem,
                        quantity: cartItem.quantity - 1,
                      });
                    } else {
                      deleteCartItem(cartItem);
                    }
                  }}
                >
                  -
                </button>
              </>
            ) : (
              <button
                type="button"
                disabled={!!isItemAdding}
                onClick={() => addToCart(product)}
                className="btn w-full disabled:bg-slate-400"
              >
                Add to cart
              </button>
            )}
          </div>
        );
      }}
    </CartContext.Consumer>
  );
};

export default CartButtons;
