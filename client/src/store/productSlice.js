import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async function (args, { rejectWithValue, dispatch, getState }) {
    const { newCategory, offset } = args;
    const params = new URLSearchParams();

    newCategory ? params.append('categoryId', newCategory) : params.delete('categoryId');

    offset && offset !== 0 ? params.append('offset', offset) : params.delete('offset');

    if (newCategory !== getState().products.activeCategory) {
      dispatch(changeCategory(newCategory));
    }

    try {
      const response = await fetch(`http://localhost:7070/api/items?${params}`);
      console.log(`http://localhost:7070/api/items?${params}`);
      if (!response.ok) {
        throw new Error('Произошла ошибка при загрузке списка fetchProducts 1');
      }

      const data = await response.json();

      // data.length < 6
      //   ? dispatch(changeStatusButton('invisible'))
      //   : dispatch(changeStatusButton('idle'));

      // dispatch(addProducts(data));
      return data;
    } catch (error) {
      return rejectWithValue('Произошла ошибка при загрузке списка fetchProducts 2');
    }
  }
);

// export const fetchChangeCategory = createAsyncThunk(
//   'product/fetchChangeCategory',
//   async function (args, { rejectWithValue, dispatch, getState }) {
//     const { newCategory } = args;
//     const params = new URLSearchParams();
//     // const { activeCategory } = getState().products;

//     newCategory ? params.append('categoryId', newCategory) : params.delete('categoryId');

//     dispatch(changeCategory(newCategory));

//     try {
//       const response = await fetch(`http://localhost:7070/api/items?${params}`);
//       console.log(`http://localhost:7070/api/items?${params}`);
//       if (!response.ok) {
//         throw new Error('Произошла ошибка при загрузке списка fetchChangeCategory 1');
//       }

//       const data = await response.json();

//       return data;
//     } catch (error) {
//       return rejectWithValue('Произошла ошибка при загрузке списка fetchChangeCategory 2');
//     }
//   }
// );

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
      return rejectWithValue('Произошла ошибка при загрузке списка top-sales');
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
  state.status = 'rejected';
  state.error = action.payload;
  state.statusButton = 'idle';
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
    statusButton: 'invisible', // idle, loading, invisible
    filter: '',
    // itemsInLoading: [],
    error: null,
  },
  reducers: {
    // addProducts(state, action) {
    //   state.products = [...state.products, ...action.payload];
    // },
    changeCategory(state, action) {
      // state.statusProductList = 'loading';
      state.products = [];
      state.activeCategory = action.payload;
    },

    changeStatusProductList(state, action) {
      state.statusProductList = action.payload;
    },
    // changeStatusButton(state, action) {
    //   state.statusButton = action.payload;
    // },

    // filterItems(state, action) {
    // console.log(action.payload);
    //   state.filter = action.payload;
    // },
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

    [fetchCategories.pending]: (state) => {
      // state.error = null;
    },
    // [fetchChangeCategory.pending]: (state) => {
    //   state.products = [];
    //   state.statusProductList = 'loading';
    //   // state.statusButton = 'invisible';
    // },

    [fetchProducts.fulfilled]: (state, action) => {
      state.products = [...state.products, ...action.payload];
      state.statusProductList = 'idle';
      if (action.payload.length < 6) {
        state.statusButton = 'invisible';
      } else {
        state.statusButton = 'idle';
      }
    },

    [fetchProduct.fulfilled]: (state, action) => {
      state.product = action.payload;
      state.status = 'idle';
    },

    // [fetchChangeCategory.fulfilled]: (state, action) => {
    //   // console.log(action.payload);
    //   state.statusProductList = 'idle';
    //   state.status = 'idle';
    //   // state.statusButton = 'idle';
    //   state.products = action.payload;
    // },

    [fetchProductsTop.fulfilled]: (state, action) => {
      state.statusProductListTop = 'idle';
      state.productsTop = action.payload;
    },

    [fetchCategories.fulfilled]: (state, action) => {
      // state.status = 'idle';
      state.categories = action.payload;
    },

    [fetchProducts.rejected]: setError,
    // [fetchChangeCategory.rejected]: setError,
    [fetchProductsTop.rejected]: setError,
    [fetchProduct.rejected]: setError,
    [fetchCategories.rejected]: setError,
  },
});

export const {
  addProducts,
  filterItems,
  changeCategory,
  changeCategoryProducts,
  changeStatusProductList,
  changeStatusButton,
} = productSlice.actions;

export default productSlice.reducer;
