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
            // ✅ Mutation style (Safe)
            state.loading = true;
        },
        addCartItemSuccess(state, action) {
            const item = action.payload;
            const isItemExist = state.items.find(i => i.product == item.product);
            
            if (isItemExist) {
                // ✅ FIX: Sum the quantities instead of replacing the item
                state.items = state.items.map(i => 
                    i.product == isItemExist.product 
                    ? { ...i, quantity: i.quantity + item.quantity } // Add new qty to old qty
                    : i
                );
            } else {
                state.items.push(item);
            }

            localStorage.setItem("cartItems", JSON.stringify(state.items));
            state.loading = false;
        },
                addCartItemFail(state, action) {
            // ✅ Mutation style (Safe)
            state.loading = false;
            state.error = action.payload;
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
            image: data.product.images[0].image, 
            stock: data.product.stock,
            quantity,
        };
        
        dispatch(addCartItemSuccess(item));
        
    } catch (error) {
        dispatch(addCartItemFail(error.response?.data?.message || error.message));
    }
};