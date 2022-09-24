import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAparts = createAsyncThunk('apart/fetchAparts', async () => {
  const { data } = await axios.get(`/aparts`);
  return data;
});

const initialState = {
  items: [],
  activeList: [],
  activePoint: null,
  status: 'loading',
  modalFulfilled: 'hold',
};

const apartSlice = createSlice({
  name: 'apart',
  initialState,
  reducers: {
    setActiveList(state, action) {
      state.activeList = action.payload;
    },
    setActivePoint(state, action) {
      state.activePoint = action.payload;
    },
    addNewApart(state, action) {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAparts.pending, (state) => {
        state.items = [];
        state.status = 'loading';
      })
      .addCase(fetchAparts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchAparts.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const { setActiveList, setActivePoint, addNewApart } =
  apartSlice.actions;

export const apartReducer = apartSlice.reducer;
