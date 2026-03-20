import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
// ✨ NEW: Import the User Slice
import userReducer from "./slices/userSlice"; 

const reducer = combineReducers({
    productsState: productsReducer, // Used in Home.jsx
    authState:  authReducer,   // Used in ProductDetails.jsx
    cartState: cartReducer,    // Used in ProductDetails.jsx
    orderState: orderReducer,  // Used in ConfirmOrder.jsx
    // ✨ NEW: Add the User State to the central store
    userState: userReducer,
});

const store = configureStore({
    reducer,
});

export default store;