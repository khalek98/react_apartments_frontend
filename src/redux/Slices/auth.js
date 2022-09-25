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

export const fetchAuthUser = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get(`/auth/user`);
  return data;
});

export const fetchUpdateUser = createAsyncThunk(
  'auth/fetchUpdateUser',
  async (params) => {
    const { data } = await axios.patch('/user', params);
    return data;
  },
);

const initialState = {
  data: null,
  status: 'loading',
  signIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      state.data = null;
    },
    setSignIn(state) {
      state.signIn = true;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchSignUp.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchSignUp.fulfilled]: (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    },
    [fetchSignUp.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchAuthUser.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuthUser.fulfilled]: (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    },
    [fetchAuthUser.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchUpdateUser.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchUpdateUser.fulfilled]: (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    },
    [fetchUpdateUser.rejected]: (state) => {
      state.status = 'loading';
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const { signOut, setSignIn } = authSlice.actions;

export const authReducer = authSlice.reducer;
