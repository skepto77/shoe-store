import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  itemEdit: {},
  status: 'idle', // idle, rejected, loading
  filter: '',
  itemsInLoading: [],
  redirectToList: false,
  error: null,
};

// thunks

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('http://localhost:7070/api/items');
      console.log(response);
      if (!response.ok) {
        throw new Error('Произошла ошибка при загрузке списка');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Произошла ошибка при загрузке списка');
    }
  }
);

// export const fetchItem = createAsyncThunk(
//   'list/fetchItem',
//   async function (id, { rejectWithValue }) {
//     try {
//       const response = await fetch(`http://localhost:7070/api/services/${id}`);

//       if (!response.ok) {
//         throw new Error('Ошибка при загрузке пункта из списка. Обновите страницу');
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue('Ошибка при загрузке пункта из списка. Обновите страницу');
//     }
//   }
// );

// export const fetchRemoveItem = createAsyncThunk(
//   'list/fetchRemoveItem',
//   async function (id, { rejectWithValue, dispatch }) {
//     try {
//       dispatch(addToItemsInLoading(id));
//       await fetch(`http://localhost:7070/api/services/${id}`, {
//         method: 'DELETE',
//       });
//     } catch (error) {
//       return rejectWithValue('Ошибка при удалении данных');
//     } finally {
//       dispatch(removeItem(id));
//       dispatch(removeFromItemsInLoading(id));
//     }
//   }
// );

// export const fetchAddItem = createAsyncThunk(
//   'list/fetchAddItem',
//   async function ({ name, price, content }, { rejectWithValue, dispatch }) {
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json;charset=utf-8' },
//       body: JSON.stringify({ id: 0, name, price, content }),
//     };

//     try {
//       const response = await fetch('http://localhost:7070/api/services', requestOptions);

//       if (!response.ok) {
//         throw new Error('Ошибка при добавлении данных');
//       }

//       dispatch(fetchItems());
//     } catch (error) {
//       return rejectWithValue('Ошибка при добавлении данных');
//     }
//   }
// );

// export const fetchSaveItem = createAsyncThunk(
//   'list/fetchSaveItem',
//   async function ({ id, name, price, content }, { rejectWithValue, dispatch }) {
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json;charset=utf-8' },
//       body: JSON.stringify({ id: Number(id), name, price, content }),
//     };

//     try {
//       const response = await fetch('http://localhost:7070/api/services', requestOptions);

//       if (!response.ok) {
//         throw new Error('Ошибка при сохранении данных. Обновите страницу');
//       }

//       dispatch(fetchItems());
//     } catch (error) {
//       return rejectWithValue('Ошибка при сохранении данных. Обновите страницу');
//     }
//   }
// );

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const setLoading = (state) => {
  state.status = 'loading';
  state.error = null;
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: setLoading,

    [fetchProducts.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.status = 'idle';
      state.products = action.payload;
    },

    [fetchProducts.rejected]: setError,
  },
});

export const { filterItems } = productSlice.actions;

export default productSlice.reducer;
