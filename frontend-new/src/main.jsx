import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import store from './store';             // Import your Redux store
import { Provider } from 'react-redux';  // Import the Provider
import 'bootstrap/dist/css/bootstrap.min.css'; // Keep Bootstrap
import './index.css';                    // Keep your global styles

//Optional: Keep this only if you want to verify Redux works in the console
console.log("Redux Store Loaded:", store); 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);