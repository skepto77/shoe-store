import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setFilter } from '../store/productSlice';

const Search = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.products);
  const [keyword, setKeyword] = useState(filter);

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (keyword === '') {
      dispatch(setFilter(keyword));
    }
    dispatch(setFilter(keyword));
    console.log('setFilter(keyword) Search keyword:', keyword);
    // console.log('keyword:', keyword);
    // dispatch(fetchProducts({ q: keyword }));
    // if (keyword === '') {
    //   console.log('keyword === ', keyword);
    //   fetchProducts({ q: '' });
    // }
  };

  return (
    <>
      <form className='catalog-search-form form-inline' onSubmit={handlerSubmit}>
        <input
          className='form-control'
          placeholder='Поиск'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
    </>
  );
};

export default Search;
