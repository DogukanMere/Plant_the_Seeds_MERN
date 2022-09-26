import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk(
  '/orders/createOrder',
  async (props, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();
      const userToken = user.userInfo.token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      };
      const order = props;
      const { data } = await axios.post('/api/orders', order, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  '/orders/getOrderDetails',
  async (props, thunkAPI) => {
    try {
      const id = props;
      const { user } = thunkAPI.getState();
      const getUserToken = user.userInfo.token;
      const config = {
        headers: {
          Authorization: `Bearer ${getUserToken}`,
        },
      };

      const { data } = await axios.get(`/api/orders/${id}`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  loadingOrder: true,
  success: false,
  order: {},
  error: '',
  orderDetails: {},
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: {
    // Create Order
    [createOrder.pending]: (state) => {
      state.loadingOrder = true;
      state.error = '';
      state.success = false;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.loadingOrder = false;
      state.order = action.payload;
      state.success = true;
    },
    [createOrder.rejected]: (state, action) => {
      state.loadingOrder = false;
      state.error = action.payload;
      state.success = false;
    },

    // Get Order by Id
    [getOrderDetails.pending]: (state) => {
      state.loadingOrder = true;
      state.error = '';
      state.success = false;
    },
    [getOrderDetails.fulfilled]: (state, action) => {
      state.loadingOrder = false;
      state.orderDetails = action.payload;
      state.success = true;
    },
    [getOrderDetails.rejected]: (state, action) => {
      state.loadingOrder = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export default orderSlice.reducer;