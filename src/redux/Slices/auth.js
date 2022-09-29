import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  const { data } = await axios.post(`/auth/signIn`, params);
  return data;
});

export const fetchSignUp = createAsyncThunk(
  'auth/fetchSignUp',
  async (params) => {
    const { data } = await axios.post(`/auth/signUp`, params);
    return data;
  },
);

export const fetchAuthUser = createAsyncThunk(
  'auth/fetchAuthUser',
  async () => {
    const { data } = await axios.get(`/auth/user`);
    return data;
  },
);

export const fetchUpdateUser = createAsyncThunk(
  'auth/fetchUpdateUser',
  async (params) => {
    const { data } = await axios.patch('/user', params);
    return data;
  },
);

const initialState = {
  user: null,
  userPosts: [],
  status: 'loading',
  signIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      state.user = null;
    },
    setSignIn(state) {
      state.signIn = true;
    },
    addNewUserPost(state, action) {
      state.userPosts = [...state.userPosts, action.payload];
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = 'loading';
      state.user = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = 'success';
      state.user = action.payload.userData;
      state.userPosts = action.payload.userPosts;
    },
    [fetchAuth.rejected]: (state) => {
      state.status = 'error';
      state.user = null;
      state.userPosts = [];
    },
    [fetchSignUp.pending]: (state) => {
      state.status = 'loading';
      state.user = null;
    },
    [fetchSignUp.fulfilled]: (state, action) => {
      state.status = 'success';
      state.user = action.payload;
    },
    [fetchSignUp.rejected]: (state) => {
      state.status = 'error';
      state.user = null;
    },
    [fetchAuthUser.pending]: (state) => {
      state.status = 'loading';
      state.user = null;
      state.userPosts = [];
    },
    [fetchAuthUser.fulfilled]: (state, action) => {
      state.status = 'success';
      state.user = action.payload.userData;
      state.userPosts = action.payload.userPosts;
    },
    [fetchAuthUser.rejected]: (state) => {
      state.status = 'error';
      state.user = null;
      state.userPosts = [];
    },
    [fetchUpdateUser.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchUpdateUser.fulfilled]: (state, action) => {
      state.status = 'success';
      state.user = action.payload;
    },
    [fetchUpdateUser.rejected]: (state) => {
      state.status = 'loading';
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.user);
export const { signOut, setSignIn, addNewUserPost } = authSlice.actions;

export const authReducer = authSlice.reducer;
