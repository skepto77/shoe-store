import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../store/productSlice';

import CartMini from './CartMini';

const SearchMini = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filter } = useSelector((state) => state.products);
  const [keyword, setKeyword] = useState(filter);

  const searchInputRef = useRef();
  const [isActiveForm, setIsActiveForm] = useState(false);

  const formClass = cn('header-controls-search-form form-inline', {
    invisible: !isActiveForm,
  });

  const handlerClick = (e) => {
    e.preventDefault();
    setIsActiveForm((isActiveForm) => !isActiveForm);
    searchInputRef.current.focus();
    // searchInputRef.current.style.border = '1px solid black';
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (window.location.pathname !== '/catalog') {
      navigate('/catalog');
    }
    dispatch(fetchProducts({ q: keyword }));
  };

  return (
    <>
      <div className='header-controls-pics'>
        <div
          data-id='search-expander'
          className='header-controls-pic header-controls-search'
          onClick={(e) => handlerClick(e)}
        ></div>
        <Link to='/cart'>
          <CartMini />
        </Link>
      </div>
      <form data-id='search-form' className={formClass} onSubmit={handlerSubmit}>
        <input
          className='form-control'
          placeholder='Поиск'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          ref={searchInputRef}
        />
      </form>
    </>
  );
};

export default SearchMini;
