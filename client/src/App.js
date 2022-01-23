import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import ContactsPage from './pages/ContactsPage';
import CartPage from './pages/CartPage';
import PageNotFound404 from './pages/PageNotFound404';

// import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='catalog' element={<CatalogPage />} />
        <Route path='catalog/:id' element={<ProductPage />} />
        <Route path='about' element={<AboutPage />} />
        <Route path='contacts' element={<ContactsPage />} />
        <Route path='cart' element={<CartPage />} />
        <Route path='*' element={<PageNotFound404 />} />
      </Route>
    </Routes>
  );
}

export default App;
