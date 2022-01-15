import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductListPage from './pages/ProductListPage';
import ContactsPage from './pages/ContactsPage';
import PageNotFound404 from './pages/PageNotFound404';

// import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='catalog' element={<ProductListPage />} />
        <Route path='catalog/:id' element={<ProductListPage />} />
        {/* <Route path='/' element={<Navigate replace to='services' />} /> */}
        <Route path='about' element={<AboutPage />} />
        <Route path='contacts' element={<ContactsPage />} />
        <Route path='*' element={<PageNotFound404 />} />
      </Route>
    </Routes>
  );
}

export default App;
