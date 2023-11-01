import React, { useEffect, useState } from 'react';
import WebFont from 'webfontloader';
import { Routes, Route } from 'react-router-dom';
import Layout from "./component/Layout/Layout"
import Home from './component/Home/Home';
import ProductDetails from './component/ProductDetails/ProductDetails';
import Products from './component/ProductDetails/Products';
import Search from './component/ProductDetails/Search';
import LoginSignup from './component/User/LoginSignup';
import Profile from './component/User/Profile';
import ProtectedRoute from './component/Routes/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './component/Cart/Payment';
// to use Cardnumberelement we must import these 
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import DashBoard from './component/Admin/DashBoard';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import About from './component/Layout/About/About';
import Contact from './component/Layout/Contact/Contact';
import PageNotFound from './component/Layout/PageNotFound/PageNotFound';

const App = () => {
  const url = "http://localhost:3500"
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json", // Corrected Content-Type
        Authorization: `Bearer ${token}`,
      }
    }
    try {
      const { data } = await axios.get(`${url}/api/v1/stripeapikey`, config); // Added a slash before "api"
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching stripeApiKey:", error);
    }
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
    getStripeApiKey();
  }, []);
  // handle right click.
  useEffect(() => {
    document.addEventListener('contextmenu', e => e.preventDefault());

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('contextmenu', e => e.preventDefault());
    };
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginSignup />} />
        {/* protected routes  */}
        <Route
          path='/account'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/me/update'
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/password/update'
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/password/forgot'
          element={
            <ForgotPassword />
          }
        />
        <Route
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          } />

        <Route path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          } />

        {stripeApiKey && <Route path="/process/payment"
          element={
            <ProtectedRoute>
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          } />}

        <Route path="/success" element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        } />

        <Route path="/orders" element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
        />
        <Route path="/order/:id" element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
        />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute isAdmin={true} >
            <DashBoard />
          </ProtectedRoute>
        } />
        <Route path="/admin/products" element={
          <ProtectedRoute isAdmin={true} >
            <ProductList />
          </ProtectedRoute>
        } />
        <Route path="/admin/product" element={
          <ProtectedRoute isAdmin={true} >
            <NewProduct />
          </ProtectedRoute>
        } />
        <Route path="/admin/product/:id" element={
          <ProtectedRoute isAdmin={true} >
            <UpdateProduct />
          </ProtectedRoute>
        } />
        <Route path="/admin/orders" element={
          <ProtectedRoute isAdmin={true} >
            <OrderList />
          </ProtectedRoute>
        } />
        <Route path="/admin/order/:id" element={
          <ProtectedRoute isAdmin={true} >
            <ProcessOrder />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute isAdmin={true} >
            <UsersList />
          </ProtectedRoute>
        } />

        <Route path="/admin/user/:id" element={
          <ProtectedRoute isAdmin={true} >
            <UpdateUser />
          </ProtectedRoute>
        } />

        <Route path="/admin/reviews" element={
          <ProtectedRoute isAdmin={true} >
            <ProductReviews />
          </ProtectedRoute>
        } />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;