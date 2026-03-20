// =========================================================================
// 1. LIBRARIES & FRAMEWORK IMPORTS
// =========================================================================
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios"; 
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// =========================================================================
// 2. STATE MANAGEMENT & UTILS
// =========================================================================
import { loadUser } from "./slices/authSlice";
import ProtectedRoute from "./components/route/ProtectedRoutes";
import ScrollToTop from "./components/layouts/ScrollToTop";

// =========================================================================
// 3. LAYOUT COMPONENTS
// =========================================================================
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";


// =========================================================================
// 4. CORE FEATURE COMPONENTS
// =========================================================================
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import UserOrders from "./components/order/UserOrders";
import OrderDetails from "./components/order/OrderDetails";

// ✨ Stripe Imports
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// =========================================================================
// 5. AUTHENTICATION COMPONENTS
// =========================================================================
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";

// =========================================================================
// 6. USER PROFILE COMPONENTS
// =========================================================================
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";

// =========================================================================
// 7. ADMIN DASHBOARD COMPONENTS
// =========================================================================
import Dashboard from "./components/admin/Dashboard";
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import UpdateOrder from './components/admin/UpdateOrder';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // Keeps user logged in on refresh
    dispatch(loadUser());

    async function getStripeApiKey() {
      try {
        const { data } = await axios.get("/api/v1/stripeapikey");
        setStripeApiKey(data.stripeApiKey);
      } catch (error) {
        console.error("Failed to load Stripe Key", error);
      }
    }

    getStripeApiKey();
  }, [dispatch]);

  return (
    <Router>
      <HelmetProvider>
        {/* ✨ THE MASTER WRAPPER: position relative creates the layering context */}
        <div className="d-flex flex-column min-vh-100 position-relative" style={{ backgroundColor: 'transparent', overflowX: 'hidden' }}>
          
          {/* ✨ GLOBAL INTERACTIVE LAYER (Base Layer: z-index -1) */}
          

          <ScrollToTop />

          {/* ✨ HEADER LAYER (Upper Layer: z-index 10) */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            <Header />
          </div>

          {/* ✨ MAIN CONTENT AREA (Middle Layer: z-index 5) */}
          <main className="flex-grow-1" style={{ position: 'relative', zIndex: 5 }}>
            <ToastContainer theme="colored" position="top-center" />

            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />

              {/* AUTHENTICATION ROUTES */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route path="/password/reset/:token" element={<ResetPassword />} />

              {/* PROTECTED ROUTES (Login Required) */}
              <Route path="/myprofile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/myprofile/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
              <Route path="/myprofile/update/password" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
              <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
              <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
              <Route path="/order/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><UserOrders /></ProtectedRoute>} />
              <Route path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />

              {/* STRIPE PAYMENT ROUTE */}
              {stripeApiKey && (
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <Elements stripe={loadStripe(stripeApiKey)}>
                        <Payment />
                      </Elements>
                    </ProtectedRoute>
                  }
                />
              )}

              {/* ADMIN ROUTES (Admin Privilege Required) */}
              <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>} />
              <Route path="/admin/products/create" element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>} />
              <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>} />
              <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true}><OrderList /></ProtectedRoute>} />
              <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}><UpdateOrder /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UserList /></ProtectedRoute>} />
              <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} />
            </Routes>
          </main>

          {/* ✨ FOOTER LAYER (Upper Layer: z-index 10) */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            <Footer />
          </div>
          
        </div>
      </HelmetProvider>
    </Router>
  );
}

export default App;