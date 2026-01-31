import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";

import authReducer from "./slices/authSlice";

const reducer = combineReducers({
    productsState: productsReducer, // Used in Home.jsx
    
    authState:  authReducer   // Used in ProductDetails.jsx
});

const store = configureStore({
    reducer,
});

export default store;