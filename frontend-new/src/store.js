import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import productReducer from "./slices/productsSlice";

const reducer = combineReducers({
    productsState: productsReducer, // Used in Home.jsx
    productState: productReducer    // Used in ProductDetails.jsx
});

const store = configureStore({
    reducer,
});

export default store;