import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <HelmetProvider>
        {/* 1. Main Wrapper: Forces app to take at least 100% screen height */}
        <div className="d-flex flex-column min-vh-100">
            
            <Header/>
            
            {/* 2. Content Wrapper: 'flex-grow-1' expands this area to fill empty space */}
            <div className='container container-fluid flex-grow-1'>
              <ToastContainer theme='dark' />
              <Routes>
                  <Route path='/' element={<Home/>} />
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