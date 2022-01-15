import React from 'react';

const Banner = () => {
  return (
    <>
      <div className='banner'>
        <img
          src={require('../assets/img/banner.jpg')}
          className='img-fluid'
          alt='К весне готовы!'
        />
        <h2 className='banner-header'>К весне готовы!</h2>
      </div>
    </>
  );
};

export default Banner;
