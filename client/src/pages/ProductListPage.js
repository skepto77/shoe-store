import React from 'react';
import ProductList from '../components/ProductList';
const ProductListPage = () => {
  return (
    <>
      <section className='top-sales'>
        <h2 className='text-center'>Каталог</h2>
        <ProductList />
      </section>
    </>
  );
};

export default ProductListPage;
