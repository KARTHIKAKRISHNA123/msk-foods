import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productsSlice = createSlice({
    name: "products",
    initialState: {
        loading: false,
        products: [],
        productsCount: 0,
        error: null 
    },
    reducers: {
        productsRequest(state, action) {
            return {
                ...state,
                loading: true,
                products: []
            }
        },
        productsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.count 
            }
        },
        productsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        }
    }
});

const { actions, reducer } = productsSlice;

export const { 
    productsRequest, 
    productsSuccess, 
    productsFail,
    clearError
} = actions;

export default reducer;


// --- THUNK (The API Call) ---
// This replaces your old 'productActions.js' file
export const getProducts = () => async (dispatch) => {
    try {
        dispatch(productsRequest());
        const { data } = await axios.get('/api/v1/products');
        dispatch(productsSuccess(data));
    } catch (error) {
        dispatch(productsFail(error.response.data.message || error.message));
    }
};