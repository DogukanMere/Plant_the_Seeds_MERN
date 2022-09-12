import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducer';

const reducers = {
  productList: productListReducer,
  productDetails: productDetailsReducer,
};
const initialState = {};
const middleware = [thunk];

const store = configureStore({
  reducer: reducers,
  preloadedState: initialState,
  middleware: middleware,
});

export default store;
