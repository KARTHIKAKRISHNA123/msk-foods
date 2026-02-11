import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")): [],
        loading: false,
        error: null
    },
    reducers: {
        addCartItemRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        addCartItemSuccess(state, action) {
            const item = action.payload;
            const isItemExist = state.items.find(i => i.product == item.product);
            
            if (isItemExist) {
                state = {
                    ...state,
                    loading: false,
                }
            } else {
                state = {
                    ...state,
                    items: [...state.items, item],
                    loading: false,
                }
                localStorage.setItem("cartItems", JSON.stringify(state.items));
            }
            return state;
        },
        addCartItemFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
    }
});

const { actions, reducer } = cartSlice;

export const { 
    addCartItemRequest,
    addCartItemSuccess,
    addCartItemFail
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
            image: data.product.images[0].image, // ✨ FIXED: Changed from .url to .image
            stock: data.product.stock,
            quantity,
        };
        
        dispatch(addCartItemSuccess(item));
        
    } catch (error) {
        // ✨ FIXED: Added '?.'. Now it safely checks before reading 'data'
        dispatch(addCartItemFail(error.response?.data?.message || error.message));
    }
};