import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Product } from "./features/product/components/Product.js";
import Home from "./pages/Home.js";
import "./App.css";
import LoginPage from "./pages/LoginPage.js";
import SignupPage from "./pages/SignupPage.js";
import * as ReactDOM from "react-dom/client";
import Cart from "./features/cart/Cart.js";
import Checkout from "./pages/Checkout.js";
import ProductDetailPage from "./pages/ProductDetailPage.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CartPage from "./pages/CartPage.js";
import Protected from "./features/auth/component/Protected.js";
import { Disclosure } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchByUserId } from "./features/cart/cartAPI.js";
import { selectUser } from "./features/auth/authSlice.js";
import { fetchCartByIdAsync } from "./features/cart/cartSlice.js";
import PageNotFound from "./pages/404.js";
import OrderSuccessPage from "./pages/orderSuccessPage.js";
import UserOrder from "./features/user/components/UserOrder.js";
import UserProfile from "./features/user/components/UserProfile.js";
import { fetchLoggedInUserAsync, selectUserInfo, updateUserAsync } from "./features/user/userSlice.js";
import Logout from "./features/auth/component/Logout.js";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.js";
import AdminProductDetailPage from "./pages/AdminProductDetailPage.js";
import AdminProductFormPage from "./pages/AdminProductFormPage.js";
import AdminHome from "./pages/AdminHomePage.js";
import ProtectedAdmin from "./features/auth/component/ProtectedAdmin.js";
import AdminOrders from "./features/admin/component/AdminOrders.js";
import AdminOrdersPage from "./pages/AdminOrdersPage.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/logout",
    element:  
    <Logout></Logout>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/forget-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/productDetail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "*",
    element: (
      <PageNotFound></PageNotFound>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage></OrderSuccessPage>
      </Protected>
    ),
  },
  {
    path: "/userOrderPage",
    element: (
      <Protected>
        <UserOrder></UserOrder>
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfile></UserProfile>
      </Protected>

    ),
  }, {
    path: '/admin/product-detail/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },{
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  
]);
function App() {
  const dispatch=useDispatch();
  const user=useSelector(selectUser);
  // const user=useSelector(selectUserInfo);
  console.log(user)

  useEffect(()=>{
    if(user){
      dispatch(fetchCartByIdAsync(user.password))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  },[dispatch,user])
  return (
    <div className="">
      <RouterProvider router={router} />
      {/* <Checkout></Checkout> */}
    </div>
  );
}

export default App;
