import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import './App.css';
import ProductDetails from './components/product/ProductDetails';
import ScrollToTop from './components/layouts/ScrollToTop'; // 👈 1. Import it

function App() {
  return (
    <Router>
      <HelmetProvider>
        <div className="d-flex flex-column min-vh-100">
          <ScrollToTop />
            
            <Header/>
            
            {/* 👇 FIXED: Removed 'container' and 'container-fluid'. 
               Now it is just 'flex-grow-1', allowing the Hero to go Full Width.
            */}
            <div className='flex-grow-1'> 
              <ToastContainer theme='dark' />
              <Routes>
                  <Route path='/' element={<Home/>} />
                  <Route path='/product/:id' element={<ProductDetails/>} />
                  {/* We will add more routes here later */}
              </Routes>
            </div>
            
            <Footer/>
            
        </div>
      </HelmetProvider>
    </Router>
  );
}

export default App;