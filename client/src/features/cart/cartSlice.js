import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

export const addToCart = createAsyncThunk(
  '/cart/addToCart',
  async (props, thunkAPI) => {
    console.log(thunkAPI);
    const { id, qty } = props;
    const { data } = await axios.get(`/api/products/${id}`);
    const payload = {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      amountInStock: data.amountInStock,
      qty: Number(qty),
    };

    return payload;
  }
);

const initialState = { cartItems: cartItemsFromLocalStorage };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload
      );
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
  extraReducers: {
    [addToCart.fulfilled]: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        const newObject = {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
        localStorage.setItem('cartItems', JSON.stringify(newObject.cartItems));

        return newObject;
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    },
  },
});

export const { removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
