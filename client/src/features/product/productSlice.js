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

/////////
//ADMIN//
/////////

// Create product
export const addProduct = createAsyncThunk(
  '/products/addProduct',
  async (props, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();
      const { userInfo } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };
      // const { name, price, description, availableInStock, image } = props;
      const { data } = await axios.post('/api/products', {}, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  '/products/deleteProduct',
  async (props, thunkAPI) => {
    try {
      const id = props;
      const { user } = thunkAPI.getState();
      const { userInfo } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      return await axios.delete(`/api/products/${id}`, config);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Update product

const initialState = {
  // Admin variables
  loadingDelete: false,
  errorDelete: '',
  successDelete: false,
  productAdded: {},
  successCreate: false,
  errorCreate: '',
  loadingCreate: false,

  // User variables
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
      state.errorDelete = '';
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
      state.successCreate = false;
    },
    [fetchProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorProduct = action.payload;
    },

    /////////
    //ADMIN//
    /////////

    // Create Product
    // POST - /api/products
    [addProduct.pending]: (state) => {
      state.loadingCreate = true;
      state.errorCreate = '';
    },
    [addProduct.fulfilled]: (state, action) => {
      state.loadingCreate = false;
      state.productAdded = action.payload;
      state.successCreate = true;
    },
    [addProduct.rejected]: (state, action) => {
      state.loadingCreate = false;
      state.errorCreate = action.payload;
    },

    // Delete single product
    // DELETE - /api/products/:id
    [deleteProduct.pending]: (state) => {
      state.loadingDelete = true;
      state.errorDelete = '';
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loadingDelete = false;
      state.successDelete = true;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loadingDelete = false;
      state.errorDelete = action.payload;
    },
  },
});

export default productSlice.reducer;
