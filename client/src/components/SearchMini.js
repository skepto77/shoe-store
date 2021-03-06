import React, { useState, useRef, useEffect } from 'react';
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
    setIsActiveForm(true);
    searchInputRef.current.focus();

    if (isActiveForm && keyword !== '') {
      handlerSubmit(e);
    } else if (isActiveForm && keyword === '') {
      setIsActiveForm(false);
    }
  };

  const handlerChange = (value) => {
    setKeyword(value);
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
          onFocus={(e) => e.persist()}
          onChange={(e) => handlerChange(e.target.value)}
          ref={searchInputRef}
        />
      </form>
    </>
  );
};

export default SearchMini;
