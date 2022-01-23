import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import {
  fetchProducts,
  fetchCategories,
  changeCategory,
  // fetchChangeCategory,
} from '../store/productSlice';
import ProductListItem from './ProductListItem';
import Loader from './Loader';

const ProductList = () => {
  const dispatch = useDispatch();
  const {
    products,
    status,
    error,
    categories,
    statusProductList,
    statusButton,
    activeCategory,
    filter,
  } = useSelector((state) => state.products);

  // console.log(status);
  useEffect(() => {
    // dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);
  // const productsListFiltred =
  //   filter === '' ? products : products.filter((product) => product.title.includes(filter));

  const [newCategory, setNewCategory] = useState(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts({ newCategory, offset }));
  }, [offset]);

  //TODO: при переходе в catalog/ список дублируется /fix with history
  // useEffect(() => {
  //   if (newCategory !== activeCategory) {
  //     dispatch(fetchChangeCategory({ newCategory }));
  //   } else {
  //     dispatch(fetchChangeCategory());
  //   }
  // }, [newCategory]);

  useEffect(() => {
    if (newCategory !== activeCategory) {
      dispatch(fetchProducts({ newCategory }));
    } else {
      dispatch(fetchProducts());
    }
  }, [newCategory]);

  // useEffect(() => {
  //   // const url = new URL('http://localhost:7070/api/items');
  //   const params = new URLSearchParams();
  //   // if (activeCategory !== activeNewCategory) {
  //   //   dispatch(changeCategory(activeCategory));
  //   // }
  //   console.log(activeNewCategory, activeNewCategory);
  //   if (activeCategory) {
  //     params.append('categoryId', activeCategory);
  //   } else {
  //     params.delete('categoryId');
  //   }

  //   if (offset !== 0 && activeCategory === activeNewCategory) {
  //     params.append('offset', offset);
  //   } else {
  //     params.delete('offset');
  //   }
  //   dispatch(
  //     fetchProductsWithCategory(`http://localhost:7070/api/items?${params}`)
  //   );
  // }, [activeNewCategory, offset]);

  return (
    <>
      {categories.length > 0 && (
        <ul className='catalog-categories nav justify-content-center'>
          <li className='nav-item'>
            <a
              className={cn('nav-link', { active: !newCategory })}
              href='/#'
              onClick={() => setNewCategory(null)}
            >
              Все
            </a>
          </li>

          {categories.map((category) => (
            <li className='nav-item' key={category.id}>
              <a
                className={cn('nav-link', { active: newCategory === category.id })}
                href='/#'
                onClick={() => setNewCategory(category.id)}
              >
                {category.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className='row'>
        {error && console.log(error)}
        {statusProductList === 'loading' ? (
          <Loader />
        ) : (
          products && products.map((item) => <ProductListItem key={item.id} {...item} />)
        )}
      </div>
      <div className='text-center'>
        {statusButton === 'loading' ? (
          <Loader />
        ) : statusButton === 'invisible' ? (
          'null'
        ) : (
          <button className='btn btn-outline-primary' onClick={() => setOffset(offset + 6)}>
            Загрузить ещё
          </button>
        )}
      </div>
    </>
  );
};

export default ProductList;
