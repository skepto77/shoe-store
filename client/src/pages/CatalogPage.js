import React from 'react';
import ProductList from '../components/ProductList';
import Search from '../components/Search';
const ProductListPage = () => {
  return (
    <>
      <section className='catalog'>
        <h2 className='text-center'>Каталог</h2>
        <Search />
        <ProductList />
      </section>
    </>
  );
};

export default ProductListPage;
