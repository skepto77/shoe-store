import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { fetchProduct } from '../store/productSlice';
import { addToCart } from '../store/orderSlice';
import Loader from './Loader';

const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, status, error } = useSelector((state) => state.products);
  const {
    color,
    heelSize,
    images,
    manufacturer,
    material,
    price,
    reason,
    season,
    sizes,
    sku,
    title,
  } = product;

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, []);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);

  const addToBasket = () => {
    dispatch(addToCart({ id, title, size, quantity, price }));
  };

  return (
    <>
      {error && console.log(error)}
      {status === 'loading' ? (
        <Loader />
      ) : (
        product && (
          <section className='catalog-item'>
            <h2 className='text-center'>{title}</h2>
            <div className='row'>
              <div className='col-5'>
                {images && <img src={images[0]} className='img-fluid' alt={title} />}
              </div>
              <div className='col-7'>
                <table className='table table-bordered'>
                  <tbody>
                    <tr>
                      <td>Артикул</td>
                      <td>{sku}</td>
                    </tr>
                    <tr>
                      <td>Производитель</td>
                      <td>{manufacturer}</td>
                    </tr>
                    <tr>
                      <td>Цвет</td>
                      <td>{color}</td>
                    </tr>
                    <tr>
                      <td>Материалы</td>
                      <td>{material}</td>
                    </tr>
                    <tr>
                      <td>Размер каблука</td>
                      <td>{heelSize}</td>
                    </tr>
                    <tr>
                      <td>Сезон</td>
                      <td>{season}</td>
                    </tr>
                    <tr>
                      <td>Повод</td>
                      <td>{reason}</td>
                    </tr>
                  </tbody>
                </table>
                {/* TODO fix если все размеры недоступны */}
                {sizes && (
                  <>
                    <div className='text-center'>
                      <p>
                        Размеры в наличии:
                        {sizes &&
                          sizes.map((el, i) => {
                            return (
                              el.avalible && (
                                <span
                                  key={i}
                                  className={cn('catalog-item-size', {
                                    selected: el.size === size,
                                  })}
                                  onClick={() => setSize(el.size)}
                                >
                                  {el.size}
                                </span>
                              )
                            );
                          })}
                      </p>

                      <p>
                        {price} Количество:{' '}
                        <span className='btn-group btn-group-sm pl-2'>
                          <button
                            className={cn('btn btn-secondary', { disabled: quantity === 1 })}
                            onClick={() => setQuantity(quantity - 1)}
                            disabled={quantity === 1}
                          >
                            -
                          </button>
                          <span className='btn btn-outline-primary'>{quantity}</span>
                          <button
                            className={cn('btn btn-secondary', { disabled: quantity === 10 })}
                            onClick={() => setQuantity(quantity + 1)}
                            disabled={quantity === 10}
                          >
                            +
                          </button>
                        </span>
                      </p>
                    </div>

                    <button
                      className={cn('btn btn-danger btn-block btn-lg', { disabled: !size })}
                      onClick={() => addToBasket()}
                      disabled={!size}
                    >
                      В корзину
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
        )
      )}
    </>
  );
};

export default Product;
