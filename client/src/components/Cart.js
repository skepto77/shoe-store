import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCreateOrder, getCart, removeFromCart } from '../store/orderSlice';
import Loader from './Loader';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, error, status } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const createOrder = () => {
    dispatch(fetchCreateOrder({}));
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Название</th>
            <th scope='col'>Размер</th>
            <th scope='col'>Кол-во</th>
            <th scope='col'>Стоимость</th>
            <th scope='col'>Итого</th>
            <th scope='col'>Действия</th>
          </tr>
        </thead>
        <tbody>
          {error && console.log(error)}
          {status === 'loading' ? (
            <Loader />
          ) : (
            cart &&
            cart.map((item, i) => (
              <tr key={item.id}>
                <td>1</td>
                <td>
                  <a href={`catalog/${item.id}`}>{item.title}</a>
                </td>
                <td>{item.size}</td>
                <td>{item.quantity}</td>
                <td>{item.price} руб.</td>
                <td>{item.quantity * item.price} руб.</td>
                <td>
                  <button
                    className='btn btn-outline-danger btn-sm'
                    onClick={() => removeItem(item.id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))
          )}

          <tr>
            <td colSpan='5' className='text-right'>
              Общая стоимость
            </td>
            <td>{cart.reduce((acc, item) => acc + item.quantity * item.price, 0)} руб.</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Cart;
