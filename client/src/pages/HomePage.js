import React from 'react';
import ProductList from '../components/ProductList';
import ProductListTop from '../components/ProductListTop';
const HomePage = () => {
  return (
    <>
      <section className='top-sales'>
        <h2 className='text-center'>Хиты продаж!</h2>
        <ProductListTop />
      </section>
      <section className='catalog'>
        <h2 className='text-center'>Каталог</h2>
        <ProductList />
      </section>
    </>
  );
};

export default HomePage;
