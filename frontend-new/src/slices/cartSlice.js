import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        loading: false,
        error: null
    },
    reducers: {
        addCartItemRequest(state, action) {
            state.loading = true;
        },
        addCartItemSuccess(state, action) {
            const item = action.payload;
            const isItemExist = state.items.find(i => i.product == item.product);
            
            if (isItemExist) {
                // ✅ Sum quantities (Works for both "Add to Cart" and "+/-" buttons)
                state.items = state.items.map(i => 
                    i.product == isItemExist.product 
                    ? { ...i, quantity: i.quantity + item.quantity } 
                    : i
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
        // ✨ NEW: Action to remove item from cart
        removeItemFromCart(state, action) {
            // Filter out the item that matches the ID passed in action.payload
            const filterItems = state.items.filter(item => item.product !== action.payload);
            
            // Update LocalStorage
            localStorage.setItem('cartItems', JSON.stringify(filterItems));
            
            // Update State
            state.items = filterItems;
        }
    }
});

const { actions, reducer } = cartSlice;

export const { 
    addCartItemRequest,
    addCartItemSuccess,
    addCartItemFail,
    removeItemFromCart // 👈 Don't forget to export this!
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