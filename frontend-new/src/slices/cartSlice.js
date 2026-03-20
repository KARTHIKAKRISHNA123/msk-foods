// src/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // ✨ Start empty. We will load the user's specific cart upon login.
        loading: false,
        error: null,
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
    },
    reducers: {
        addCartItemRequest(state, action) {
            state.loading = true;
        },
        addCartItemSuccess(state, action) {
            const item = action.payload;
            const isItemExist = state.items.find(i => i.product === item.product);
            
            if (isItemExist) {
                // Replace the quantity entirely, do not add them together.
                state.items = state.items.map(i => 
                    i.product === isItemExist.product ? item : i
                );
            } else {
                state.items.push(item);
            }

            localStorage.setItem("cartItems", JSON.stringify(state.items));
            state.loading = false;
        },
        addCartItemFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        removeItemFromCart(state, action) {
            const filterItems = state.items.filter(item => item.product !== action.payload);
            localStorage.setItem('cartItems', JSON.stringify(filterItems));
            state.items = filterItems;
        },
        orderCompleted(state, action) {
            // Do not clear shipping info on order completion, only cart items.
            localStorage.removeItem('cartItems');
            sessionStorage.removeItem('orderInfo');
            
            state.items = [];
            state.loading = false;
            state.error = null;
        },
        saveShippingInfo(state, action) {
            state.shippingInfo = action.payload; 
            localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
        },
        // ✨ NEW: Restores a user's saved cart when they log in
        restoreUserCart(state, action) {
            const userId = action.payload;
            const savedCart = localStorage.getItem(`cartItems_${userId}`);
            
            if (savedCart) {
                state.items = JSON.parse(savedCart);
                // Also restore to the active shared key so the UI updates immediately
                localStorage.setItem('cartItems', savedCart);
            } else {
                // If they don't have a saved cart, clear the active key
                state.items = [];
                localStorage.removeItem('cartItems');
            }
        }
    }
});

const { actions, reducer } = cartSlice;

export const { 
    addCartItemRequest,
    addCartItemSuccess,
    addCartItemFail,
    removeItemFromCart,
    orderCompleted,
    saveShippingInfo,
    restoreUserCart // ✨ Export the new action
} = actions;

export default reducer;


// --- THUNK (The API Call for Cart) ---
export const addToCart = (id, quantity) => async (dispatch) => {
    try {
        dispatch(addCartItemRequest()); 
        
        const { data } = await axios.get(`/api/v1/product/${id}`);
        
        const item = {
            product: data.product._id,  
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].image, 
            stock: data.product.stock,
            quantity, 
        };
        
        dispatch(addCartItemSuccess(item));
        
    } catch (error) {
        dispatch(addCartItemFail(error.response?.data?.message || error.message));
    }
};