import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store.js';             // 1. Import the store
import { Provider } from 'react-redux';  // 2. Import the Provider

console.log(store);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <Provider store={store}>  {/* 3. Wrap App in Provider */}
      <App />
    </Provider>
  //</React.StrictMode>
);