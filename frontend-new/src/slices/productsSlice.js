import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productsSlice = createSlice({
    name: 'products',
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
        // --- ADMIN REDUCERS ---
        adminProductsRequest(state, action) {
            return {
                ...state,
                loading: true,
                products: []
            }
        },
        adminProductsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.count
            }
        },
        adminProductsFail(state, action) {
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

// ✨ FIX: You must export the admin actions here so the thunk can use them!
export const { 
    productsRequest, 
    productsSuccess, 
    productsFail,
    adminProductsRequest, 
    adminProductsSuccess, 
    adminProductsFail,
    clearError
} = actions;

export default reducer;

// --- THUNK: Get Products for Public Store ---
export const getProducts = () => async (dispatch) => {
    try {
        dispatch(productsRequest());
        const { data } = await axios.get('/api/v1/products');
        dispatch(productsSuccess(data));
    } catch (error) {
        dispatch(productsFail(error.response?.data?.message || error.message));
    }
};

// --- THUNK: Get Products for Admin Dashboard ---
// ✨ ADDED: The complete API call for your Admin Inventory
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch(adminProductsRequest());
        // Note: Make sure this route matches your backend admin route!
        const { data } = await axios.get('/api/v1/admin/products'); 
        dispatch(adminProductsSuccess(data));
    } catch (error) {
        // Keeping that same safe optional chaining (?.)
        dispatch(adminProductsFail(error.response?.data?.message || error.message));
    }
};