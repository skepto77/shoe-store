import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../store/orderSlice';

const CartMini = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <>
      <div className='header-controls-pic header-controls-cart'>
        {cart && cart.length > 0 && <div className='header-controls-cart-full'>{cart.length}</div>}
        <div className='header-controls-cart-menu'></div>
      </div>
    </>
  );
};

export default CartMini;
