// =========================================================================
// 1. LIBRARIES & FRAMEWORK IMPORTS
// =========================================================================
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// =========================================================================
// 2. STATE MANAGEMENT & UTILS
// =========================================================================
import { loadUser } from './slices/authSlice';
import ProtectedRoute from './components/route/ProtectedRoutes';
import ScrollToTop from './components/layouts/ScrollToTop';

// =========================================================================
// 3. LAYOUT COMPONENTS
// =========================================================================
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';

// =========================================================================
// 4. CORE FEATURE COMPONENTS
// =========================================================================
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Cart from './components/cart/Cart'; 

// =========================================================================
// 5. AUTHENTICATION COMPONENTS
// =========================================================================
import Login from './components/user/Login';
import Register from './components/user/Register';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';

// =========================================================================
// 6. USER PROFILE COMPONENTS
// =========================================================================
import Profile from "./components/user/Profile";
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Keeps user logged in on refresh
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <HelmetProvider>
        <div className="d-flex flex-column min-vh-100">
          <ScrollToTop />
          <Header/>
          
          {/* Main Content Area: Flex Grow pushes Footer to bottom */}
          <div className='flex-grow-1'> 
            <ToastContainer theme='colored' position="bottom-right" />
            
            <Routes>
                {/* ----------------------------------------------------- */}
                {/* PUBLIC ROUTES (Accessible by everyone)                */}
                {/* ----------------------------------------------------- */}
                <Route path='/' element={<Home/>} />
                <Route path='/product/:id' element={<ProductDetails/>} />
                <Route path='/cart' element={<Cart/>} />
                
                {/* ----------------------------------------------------- */}
                {/* AUTHENTICATION ROUTES (Login/Register/Recovery)       */}
                {/* ----------------------------------------------------- */}
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/password/forgot' element={<ForgotPassword/>} />
                <Route path='/password/reset/:token' element={<ResetPassword/>} />

                {/* ----------------------------------------------------- */}
                {/* PROTECTED ROUTES (Login Required)                     */}
                {/* ----------------------------------------------------- */}
                <Route path='/myprofile' element={
                    <ProtectedRoute>
                        <Profile/>
                    </ProtectedRoute>
                } />
                <Route path='/myprofile/update' element={
                    <ProtectedRoute>
                        <UpdateProfile/>
                    </ProtectedRoute>
                } />
                <Route path='/myprofile/update/password' element={
                    <ProtectedRoute>
                        <UpdatePassword/>
                    </ProtectedRoute>
                } />
            </Routes>
          </div>
          
          <Footer/>
        </div>
      </HelmetProvider>
    </Router>
  );
}

export default App;