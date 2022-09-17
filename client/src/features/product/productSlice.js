import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  '/products/fetchProducts',
  async (props, thunkAPI) => {
    try {
      const { data } = await axios.get('/api/products');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchProduct = createAsyncThunk(
  '/products/fetchProduct',
  async (props, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/products/${props}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  products: [],
  product: {},
  isLoading: true,
  errorProducts: '',
  errorProduct: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    // All Products
    [fetchProducts.pending]: (state) => {
      state.isLoading = true;
      state.errorProducts = '';
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorProducts = action.payload;
    },
    // Single Product
    [fetchProduct.pending]: (state) => {
      state.isLoading = true;
      state.errorProduct = '';
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    },
    [fetchProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorProduct = action.payload;
    },
  },
});

export default productSlice.reducer;
