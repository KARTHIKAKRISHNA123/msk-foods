import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";

import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";

const reducer = combineReducers({
    productsState: productsReducer, // Used in Home.jsx
    
    authState:  authReducer,   // Used in ProductDetails.jsx
    cartState: cartReducer,    // Used in ProductDetails.jsx
    orderState: orderReducer,  // Used in ConfirmOrder.jsx

});

const store = configureStore({
    reducer,
});

export default store;