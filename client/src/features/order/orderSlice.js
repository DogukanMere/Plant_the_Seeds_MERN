import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// CREATE A NEW ORDER
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

// GET ORDER DETAILS
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

// GET USER MY ORDER LIST
export const getOrderList = createAsyncThunk(
  '/orders/getOrderList',
  async (props, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();
      const getUserToken = user.userInfo.token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserToken}`,
        },
      };

      const { data } = await axios.get(`/api/orders/orderlist`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// INITIAL VARIABLES
const initialState = {
  loadingOrder: true,
  success: false,
  order: {},
  error: '',
  orderDetails: {},
  orders: [],
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
      state.orderDetails = action.payload;
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

    // Get My Order List
    [getOrderList.pending]: (state) => {
      state.loadingOrder = true;
      state.error = '';
      state.success = false;
    },
    [getOrderList.fulfilled]: (state, action) => {
      state.loadingOrder = false;
      state.orders = action.payload;
      state.success = true;
    },
    [getOrderList.rejected]: (state, action) => {
      state.loadingOrder = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export default orderSlice.reducer;
