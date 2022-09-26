import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/product/productSlice';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/user/userSlice';
import orderReducer from './features/order/orderSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
  },
});

export default store;
