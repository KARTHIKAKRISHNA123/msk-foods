import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        products: [],
        productsCount: 0,
        error: null, 
        isReviewSubmitted: false,
        isProductCreated: false // Tracks if a new product was just created
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
        },
        // --- NEW PRODUCT REDUCERS ---
        newProductRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        newProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductCreated: true, // Mark as successfully created
            }
        },
        newProductsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isProductCreated: false
            }
        },
        // ✨ FIX 1: Add a reducer to reset the creation status
        clearProductCreated(state, action) {
            return {
                ...state,
                isProductCreated: false
            }
        }
    }
});

const { actions, reducer } = productsSlice;

export const { 
    productsRequest, 
    productsSuccess, 
    productsFail,
    adminProductsRequest, 
    adminProductsSuccess, 
    adminProductsFail,
    clearError,
    newProductRequest,
    newProductSuccess,
    newProductsFail,
    clearProductCreated // ✨ Export the new clearer function
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
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch(adminProductsRequest());
        const { data } = await axios.get('/api/v1/admin/products'); 
        dispatch(adminProductsSuccess(data));
    } catch (error) {
        dispatch(adminProductsFail(error.response?.data?.message || error.message));
    }
};

// --- THUNK: Create a New Product ---
// ✨ FIX 2: Added the actual API call to send the form data to your backend
export const createNewProduct = (productData) => async (dispatch) => {
    try {
        dispatch(newProductRequest());
        
        // When sending files/images, we must set the Content-Type header
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/admin/product/new', productData, config);
        
        dispatch(newProductSuccess(data));
    } catch (error) {
        dispatch(newProductsFail(error.response?.data?.message || error.message));
    }
};