import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import orderReducer from './orderSlice';

export default configureStore({
  reducer: {
    products: productReducer,
    orders: orderReducer,
  },
});
