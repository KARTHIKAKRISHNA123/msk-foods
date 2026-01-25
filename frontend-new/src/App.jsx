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
        <div className="App">
            <Header/>
            <div className='container container-fluid'>
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