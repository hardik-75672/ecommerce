import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProduct, fetchAllProducts ,fetchProductByFilters,fetchProductById, fetchProductBySearch, updateProduct} from './productAPI';

const initialState = {
  products:[],
  status: 'idle',
  totalItems:0,
  selectProduct:null
};


export const fetchAllProductAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const fetchProductByFiltersAsync = createAsyncThunk(
  'product/fetchProductByFilters',
  async ({filter,sort,page}) => {
    const response = await fetchProductByFilters(filter,sort,page);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductBySearchAsync = createAsyncThunk(
  'product/fetchProductBySearch',
  async (search) => {
    const response = await fetchProductBySearch(search);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct:(state)=>{
      state.selectProduct = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems=action.payload.totalItems;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectProduct = action.payload;
      }).addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      }).addCase(fetchProductBySearchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductBySearchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems=action.payload.totalItems;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAllProduct = (state) => state.product.products;
export const selectTotal = (state) => state.product.totalItems;
export const selectProductById = (state) => state.product.selectProduct;

export default productSlice.reducer;
