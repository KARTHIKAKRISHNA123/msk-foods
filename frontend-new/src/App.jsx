import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Component Imports
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import ScrollToTop from './components/layouts/ScrollToTop';
import { loadUser } from './slices/authSlice';
import Profile from "./components/user/Profile";
import ProtectedRoute from './components/route/ProtectedRoutes';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/updatePassword';
import './App.css';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';

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
                <Route path='/' element={<Home/>} />
                <Route path='/product/:id' element={<ProductDetails/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/myprofile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
                <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>} />
                <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>} />
                <Route path='/password/forgot' element={<ForgotPassword/>} />
                <Route path='/password/reset/:token' element={<ResetPassword/>} />
            </Routes>
          </div>
          
          <Footer/>
          
        </div>
      </HelmetProvider>
    </Router>
  );
}

export default App;