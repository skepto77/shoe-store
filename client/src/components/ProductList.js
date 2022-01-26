import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { fetchProducts, fetchCategories } from '../store/productSlice';
import ProductListItem from './ProductListItem';
import Message from './Message';
import Loader from './Loader';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, error, categories, activeCategory, statusProductList, statusButton, filter } =
    useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);

  const [newCategory, setNewCategory] = useState(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (newCategory !== activeCategory) {
      setOffset(0);
    }
    dispatch(fetchProducts({ newCategory, offset, q: filter }));
  }, [offset, filter, newCategory]);

  return (
    <>
      {categories.length > 0 && (
        <ul className='catalog-categories nav justify-content-center'>
          <li className='nav-item'>
            <Link
              className={cn('nav-link', { active: !newCategory })}
              to='/catalog'
              onClick={() => setNewCategory(null)}
            >
              Все
            </Link>
          </li>

          {categories.map((category) => (
            <li className='nav-item' key={category.id}>
              <Link
                className={cn('nav-link', { active: newCategory === category.id })}
                to=''
                onClick={() => setNewCategory(category.id)}
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {error && <Message isError={true}>{error}</Message>}
      <div className='row'>
        {statusProductList === 'loading' ? (
          <Loader />
        ) : (
          products && products.map((item) => <ProductListItem key={item.id} {...item} />)
        )}
      </div>
      <div className='text-center'>
        {statusButton === 'loading' ? (
          <Loader />
        ) : statusButton === 'invisible' ? null : (
          <button className='btn btn-outline-primary' onClick={() => setOffset(offset + 6)}>
            Загрузить ещё
          </button>
        )}
      </div>
    </>
  );
};

export default ProductList;
