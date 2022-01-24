import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCreateOrder = createAsyncThunk(
  'order/fetchCreateOrder',
  async function (order, { rejectWithValue, dispatch, getState }) {
    console.log(order);
    try {
      const response = await fetch(`http://localhost:7070/api/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      console.log(order);

      if (!response.ok) {
        throw new Error('Произошла ошибка при создании заказа 1');
      }
      return order;
    } catch (error) {
      return rejectWithValue('Произошла ошибка при создании заказа 2');
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const setLoading = (state) => {
  state.status = 'loading';
  state.error = null;
};

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: [],
    cart: [],
    status: 'idle', // idle, rejected, loading
    error: null,
    message: '',
  },
  reducers: {
    getCart(state, action) {
      state.cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    },

    addToCart(state, action) {
      const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

      const idx = cart.findIndex(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );

      if (idx === -1) {
        cart.push(action.payload);
        state.cart.push(action.payload);
      } else {
        cart[idx].count += action.payload.count;
        state.cart[idx].count += action.payload.count;
      }
      localStorage.setItem(`cart`, JSON.stringify(cart));
    },

    removeFromCart(state, action) {
      let storedCard = JSON.parse(localStorage.getItem('cart'));
      storedCard = storedCard.filter((item) => item.id !== action.payload);
      localStorage.setItem(`cart`, JSON.stringify(storedCard));

      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: {
    [fetchCreateOrder.pending]: setLoading,

    [fetchCreateOrder.fulfilled]: (state, action) => {
      state.message = `Заказ создан. Подробнее:${JSON.stringify(action.payload)}`;
      state.status = 'idle';
      localStorage.removeItem('cart');
      state.cart = [];
    },

    [fetchCreateOrder.rejected]: setError,
  },
});

export const { getCart, addToCart, removeFromCart } = orderSlice.actions;

export default orderSlice.reducer;
