import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

export const addToCart = createAsyncThunk(
  '/cart/addToCart',
  async (props, thunkAPI) => {
    const { id, qty } = props;
    const { data } = await axios.get(`/api/products/${id}`);
    const payload = {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      amountInStock: data.amountInStock,
      qty,
    };

    localStorage.setItem(
      'cartItems',
      JSON.stringify(thunkAPI.getState().cart.cartItems)
    );
    return payload;
  }
);

const initialState = { cartItems: cartItemsFromLocalStorage };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartAddItem: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    },
  },
  extraReducers: {
    [addToCart.fulfilled]: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    },
  },
});

export const { cartAddItem } = cartSlice.actions;
export default cartSlice.reducer;
