import { configureStore } from '@reduxjs/toolkit'; 
import productReducer from  '../features/product/productSlice'
import userReducer from '../features/auth/authSlice'
import cartReducer from '../features/cart/cartSlice'
import orderReducer from '../features/Order/OrderSlice';
import userDataReducer from '../features/user/userSlice'; 
export const store = configureStore({
  reducer: {
    product: productReducer,
    userData:userReducer,
    cart:cartReducer,
    order: orderReducer,
    user:userDataReducer
    
  },
});
