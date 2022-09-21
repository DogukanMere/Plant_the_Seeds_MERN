import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

export const loginUser = createAsyncThunk(
  '/users/loginUser',
  async (props, thunkAPI) => {
    try {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      };
      const { email, password } = props;
      console.log(email, password);
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  '/users/registerUser',
  async (props, thunkAPI) => {
    try {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      };
      const { name, email, password } = props;
      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  userInfo: userInfoFromLocalStorage,
  register: {},
  loading: false,
  errorUser: '',
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      localStorage.removeItem('userInfo');
      state.userInfo = null;
    },
  },
  extraReducers: {
    // get User
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.errorUser = '';
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.errorUser = action.payload;
    },

    // register User
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.errorUser = '';
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
      state.errorUser = action.payload;
    },
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
