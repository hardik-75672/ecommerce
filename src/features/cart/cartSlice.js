import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addCartApi, changeQty, deleteItemFromCart, fetchByUserId, fetchCount, resetCart } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
};

export const addCartAsync = createAsyncThunk(
  'cart/addCartApi',
  async (item) => {
    const response = await addCartApi(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchCartByIdAsync = createAsyncThunk(
  'cart/fetchByUserId',
  async (userId) => {
    const response = await fetchByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchUpdateAsync = createAsyncThunk(
  'cart/changeQty',
  async (update) => {
    const response = await changeQty(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchDeleteAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (update) => {
    const response = await deleteItemFromCart(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId) => {
    const response = await resetCart(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchCartByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload;
      })
      .addCase(fetchUpdateAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUpdateAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex((item)=>item.id===action.payload.id)
        state.items[index]=action.payload;
      })
      .addCase(fetchDeleteAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeleteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex((item)=>item.id===action.payload.id)
        state.items.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
      });
  },
});

export const { increment } = cartSlice.actions;

export const selectCart = (state) => state.cart.items;

 

export default cartSlice.reducer;
