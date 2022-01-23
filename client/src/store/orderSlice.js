import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCreateOrder = createAsyncThunk(
  'order/fetchCreateOrder',
  async function (args, { rejectWithValue, dispatch, getState }) {
    const order = {
      owner: {
        phone: '+7xxxxxxxxxxx',
        address: 'Moscow City',
      },
      items: [
        {
          id: 1,
          price: 34000,
          count: 1,
        },
      ],
    };

    try {
      const response = await fetch(`http://localhost:7070/api/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error('Произошла ошибка при создании заказа');
      }
    } catch (error) {
      return rejectWithValue('Произошла ошибка при создании заказа');
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
        cart[idx].quantity += action.payload.quantity;
        state.cart[idx].quantity += action.payload.quantity;
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

    [fetchCreateOrder.fulfilled]: (state, action) => {},

    [fetchCreateOrder.rejected]: setError,
  },
});

export const { getCart, addToCart, removeFromCart } = orderSlice.actions;

export default orderSlice.reducer;
