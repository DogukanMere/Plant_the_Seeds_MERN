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

// GET MY ORDER LIST
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

////////////
// ADMIN ///
////////////

// List all Orders
export const listOrders = createAsyncThunk(
  '/orders/listOrders',
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

      const { data } = await axios.get(`/api/orders/`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Mark an order as Delivered
export const setOrderDelivered = createAsyncThunk(
  '/orders/setOrderDelivered',
  async (props, thunkAPI) => {
    try {
      const id = props;
      const { user } = thunkAPI.getState();
      const getUserToken = user.userInfo.token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserToken}`,
        },
      };

      return await axios.put(`/api/orders/${id}/deliver`, {}, config);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Mark an order as Paid
export const setOrderPaid = createAsyncThunk(
  '/orders/setOrderPaid',
  async (props, thunkAPI) => {
    try {
      const id = props;
      const { user } = thunkAPI.getState();
      const getUserToken = user.userInfo.token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserToken}`,
        },
      };

      return await axios.put(`/api/orders/${id}/pay`, {}, config);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// INITIAL VARIABLES
const initialState = {
  // Admin Variables
  orderList: [],
  successOrder: false,
  loadingOrderDetail: true,
  successDeliver: false,
  errorDeliver: '',
  loadingDeliver: true,
  successPayment: false,
  errorPayment: '',
  loadingPayment: true,
  // User Variables
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
  reducers: {
    removeOrderDetails: (state) => {
      state.order = {};
      state.orders = [];
      state.orderDetails = {};
    },
  },
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

    ////////////
    // ADMIN ///
    ////////////

    // Get All Orders / Admin
    [listOrders.pending]: (state) => {
      state.loadingOrderDetail = true;
      state.error = '';
      state.successOrder = false;
    },
    [listOrders.fulfilled]: (state, action) => {
      state.loadingOrderDetail = false;
      state.orderList = action.payload;
      state.successOrder = true;
    },
    [listOrders.rejected]: (state, action) => {
      state.loadingOrderDetail = false;
      state.error = action.payload;
      state.successOrder = false;
    },

    // Mark an order as Delivered / Admin
    [setOrderDelivered.pending]: (state) => {
      state.successDeliver = false;
      state.errorDeliver = '';
      state.loadingDeliver = true;
    },
    [setOrderDelivered.fulfilled]: (state, action) => {
      state.successDeliver = true;
      state.loadingDeliver = false;
    },
    [setOrderDelivered.rejected]: (state, action) => {
      state.errorDeliver = action.payload;
      state.successDeliver = false;
      state.loadingDeliver = false;
    },

    // Mark an order as Paid / Admin
    [setOrderPaid.pending]: (state) => {
      state.successPayment = false;
      state.errorPayment = '';
      state.loadingPayment = true;
    },
    [setOrderPaid.fulfilled]: (state, action) => {
      state.successPayment = true;
      state.loadingPayment = false;
    },
    [setOrderPaid.rejected]: (state, action) => {
      state.errorPayment = action.payload;
      state.successPayment = false;
      state.loadingPayment = false;
    },
  },
});

export const { removeOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
