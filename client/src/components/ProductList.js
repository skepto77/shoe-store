import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import ProductListItem from './ProductListItem';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      <div className='row'>
        {products && products.map((item) => <ProductListItem key={item.id} {...item} />)}
      </div>
    </>
  );
};

export default ProductList;
