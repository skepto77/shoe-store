import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async function (args, { rejectWithValue, dispatch, getState }) {
    const params = new URLSearchParams();

    const { activeCategory } = getState().products;

    if (args) {
      const { newCategory, offset, q } = args;

      newCategory && newCategory
        ? params.append('categoryId', newCategory)
        : params.delete('categoryId');

      offset && offset !== 0 ? params.append('offset', offset) : params.delete('offset');

      if (q && q !== '') {
        dispatch(setFilter(q));
        params.append('q', q);
      } else {
        params.delete('q');
        dispatch(setFilter(''));
      }

      if (newCategory !== activeCategory) {
        dispatch(changeCategory(newCategory));
      }
    }

    try {
      const response = await fetch(`http://localhost:7070/api/items?${params}`);
      console.log(`http://localhost:7070/api/items?${params}`);
      if (!response.ok) {
        throw new Error('Произошла ошибка при загрузке списка 1');
      }

      const data = await response.json();

      data.length < 6
        ? dispatch(changeStatusButton('invisible'))
        : dispatch(changeStatusButton('idle'));

      return args && args.offset ? [...getState().products.products, ...data] : data;
    } catch (error) {
      console.log('Произошла ошибка при загрузке списка');
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductsTop = createAsyncThunk(
  'product/fetchProductsTop',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('http://localhost:7070/api/top-sales');
      if (!response.ok) {
        throw new Error('Произошла ошибка при загрузке списка top-sales');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Произошла ошибка при загрузке списка top-sales');
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async function (id, { rejectWithValue }) {
    try {
      const response = await fetch(`http://localhost:7070/api/items/${id}`);

      if (!response.ok) {
        throw new Error('Ошибка при загрузке продукта. Обновите страницу');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке продукта. Обновите страницу');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('http://localhost:7070/api/categories');
      if (!response.ok) {
        throw new Error('Произошла ошибка при загрузке списка категорий');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Произошла ошибка при загрузке списка категорий');
    }
  }
);

const setError = (state, action) => {
  console.log(action.error.message);
  state.status = 'rejected';
  state.error = action.error.message;
  state.statusButton = 'idle';
  state.statusProductList = 'idle';
};

const setLoading = (state) => {
  state.status = 'loading';
  state.error = null;
};

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    productsTop: [],
    product: [],
    categories: [],
    activeCategory: null,
    status: 'idle', // idle, rejected, loading
    statusProductList: 'idle', // idle, rejected, loading
    statusProductListTop: 'idle', // idle, rejected, loading
    statusButton: 'idle', // idle, loading, invisible
    filter: '',
    error: null,
  },
  reducers: {
    changeCategory(state, action) {
      state.products = [];
      state.activeCategory = action.payload;
    },

    setFilter(state, action) {
      state.filter = action.payload;
    },

    changeStatusButton(state, action) {
      state.statusButton = action.payload;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      if (state.products.length > 0) {
        state.statusButton = 'loading';
        state.statusProductList = 'idle';
      } else {
        state.statusButton = 'invisible';
        state.statusProductList = 'loading';
      }
    },
    [fetchProduct.pending]: setLoading,

    [fetchProductsTop.pending]: (state) => {
      state.productsTop = [];
      state.statusProductListTop = 'loading';
    },

    [fetchCategories.pending]: (state) => {},

    [fetchProducts.fulfilled]: (state, action) => {
      if (state.statusButton !== 'invisible') {
        state.statusButton = 'idle';
      }

      state.products = action.payload;
      state.statusProductList = 'idle';
    },

    [fetchProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.status = 'idle';
    },

    [fetchProductsTop.fulfilled]: (state, action) => {
      state.statusProductListTop = 'idle';
      state.productsTop = action.payload;
    },

    [fetchCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },

    [fetchProducts.rejected]: setError,
    [fetchProductsTop.rejected]: setError,
    [fetchProduct.rejected]: setError,
    [fetchCategories.rejected]: setError,
  },
});

export const {
  addProducts,
  setFilter,
  changeCategory,
  changeStatusProductList,
  changeStatusButton,
} = productSlice.actions;

export default productSlice.reducer;
