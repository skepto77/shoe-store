import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsTop } from '../store/productSlice';
import ProductListItem from './ProductListItem';
import Loader from './Loader';

const ProductListTop = () => {
  const dispatch = useDispatch();
  const { productsTop, statusProductListTop, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsTop());
  }, []);
  return (
    <>
      <div className='row'>
        {error && console.log(error)}
        {statusProductListTop === 'loading' && <Loader />}
        {productsTop && productsTop.map((item) => <ProductListItem key={item.id} {...item} />)}
      </div>
    </>
  );
};

export default ProductListTop;
