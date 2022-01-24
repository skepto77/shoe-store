import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCreateOrder, getCart, removeFromCart } from '../store/orderSlice';
import Loader from './Loader';
import Message from './Message';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    phone: yup.string().required('Это поле обязательно для заполнения, 10 цифр'),
    address: yup.string().required('Это поле обязательно для заполнения'),
    agreement: yup.bool().oneOf([true], 'Необходимио согласиться с правилами доставки'),
  })
  .required();

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, error, status, message } = useSelector((state) => state.orders);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const onSubmit = (data) => {
    const { phone, address } = data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dispatch(fetchCreateOrder({ owner: { phone, address }, items: cart })));
      }, 2000);
    });
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <section className='cart'>
        <h2 className='text-center'>Корзина</h2>
        {error && <Message isError={true}>{error}</Message>}
        {error && console.log(error)}
        {}
        {status === 'loading' ? (
          <Loader />
        ) : message ? (
          <Message isError={false}>{message}</Message>
        ) : (
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
                {cart &&
                  cart.map((item, i) => (
                    <tr key={item.id}>
                      <td>1</td>
                      <td>
                        <a href={`catalog/${item.id}`}>{item.title}</a>
                      </td>
                      <td>{item.size}</td>
                      <td>{item.count}</td>
                      <td>{item.price} руб.</td>
                      <td>{item.count * item.price} руб.</td>
                      <td>
                        <button
                          className='btn btn-outline-danger btn-sm'
                          onClick={() => removeItem(item.id)}
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}

                <tr>
                  <td colSpan='5' className='text-right'>
                    Общая стоимость
                  </td>
                  <td>{cart.reduce((acc, item) => acc + item.count * item.price, 0)} руб.</td>
                </tr>
              </tbody>
            </table>
            <section className='order'>
              <h2 className='text-center'>Оформить заказ</h2>
              <div className='card' style={{ maxWidth: '30rem', margin: '0 auto' }}>
                <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
                  <div className='form-group'>
                    <label htmlFor='phone'>Телефон</label>
                    <input className='form-control' {...register('phone')} />
                    <p style={{ color: '#cc0000' }}>{errors.phone?.message}</p>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='address'>Адрес доставки</label>
                    <input className='form-control' {...register('address')} />
                    <p style={{ color: '#cc0000' }}>{errors.address?.message}</p>
                  </div>
                  <div className='form-group form-check'>
                    <input type='checkbox' className='form-check-input' id='agreement' />
                    <input
                      name='agreement'
                      type='checkbox'
                      {...register('agreement')}
                      id='agreement'
                      className={`form-check-input`}
                    />
                    <label className='form-check-label' htmlFor='agreement'>
                      Согласен с правилами доставки
                      <p style={{ color: '#cc0000' }}>{errors.agreement?.message}</p>
                    </label>
                  </div>
                  {console.log(isSubmitting)}
                  {isSubmitting ? (
                    <Loader />
                  ) : (
                    <button
                      disabled={isSubmitting}
                      type='submit'
                      className='btn btn-outline-secondary'
                    >
                      Оформить
                    </button>
                  )}
                </form>
              </div>
            </section>
          </>
        )}
      </section>
    </>
  );
};

export default Cart;
