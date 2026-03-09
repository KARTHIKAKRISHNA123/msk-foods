import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        products: [],
        product: {}, // ✨ ADDED: To store the single product for the update form
        productsCount: 0,
        error: null, 
        isReviewSubmitted: false,
        isProductCreated: false,
        isProductDeleted: false,
        isProductUpdated: false
    },
    reducers: {
        productsRequest(state, action) {
            return { ...state, loading: true, products: [] }
        },
        productsSuccess(state, action) {
            return { ...state, loading: false, products: action.payload.products, productsCount: action.payload.count }
        },
        productsFail(state, action) {
            return { ...state, loading: false, error: action.payload }
        },
        
        // ✨ NEW: Single Product Reducers (Needed to pre-fill the Update Form!)
        productRequest(state, action) {
            return { ...state, loading: true, product: {} }
        },
        productSuccess(state, action) {
            return { ...state, loading: false, product: action.payload.product }
        },
        productFail(state, action) {
            return { ...state, loading: false, error: action.payload }
        },

        // --- ADMIN REDUCERS ---
        adminProductsRequest(state, action) {
            return { ...state, loading: true, products: [] }
        },
        adminProductsSuccess(state, action) {
            return { ...state, loading: false, products: action.payload.products, productsCount: action.payload.count }
        },
        adminProductsFail(state, action) {
            return { ...state, loading: false, error: action.payload }
        },
        clearError(state, action) {
            return { ...state, error: null }
        },

        // --- NEW PRODUCT REDUCERS ---
        newProductRequest(state, action) {
            return { ...state, loading: true }
        },
        newProductSuccess(state, action) {
            return { ...state, loading: false, product: action.payload.product, isProductCreated: true }
        },
        newProductsFail(state, action) {
            return { ...state, loading: false, error: action.payload, isProductCreated: false }
        },
        clearProductCreated(state, action) {
            return { ...state, isProductCreated: false }
        },

        // --- DELETE PRODUCT REDUCERS ---
        deleteProductRequest(state, action) {
            return { ...state, loading: true }
        },
        deleteProductSuccess(state, action) {
            return { ...state, loading: false, isProductDeleted: true }
        },
        deleteProductsFail(state, action) {
            return { ...state, loading: false, error: action.payload, isProductDeleted: false }
        },
        clearProductDeleted(state, action) {
            return { ...state, isProductDeleted: false }
        },

        // --- UPDATE PRODUCT REDUCERS ---
        updateProductRequest(state, action) {
            return { 
                ...state, 
                loading: true, // ✨ FIX: Must be true
                isProductUpdated: false // ✨ FIX: Must reset to false
            }
        },
        updateProductSuccess(state, action) {
            return { 
                ...state, 
                loading: false, 
                product: action.payload.product, 
                isProductUpdated: true 
            }
        },
        updateProductsFail(state, action) {
            return { ...state, loading: false, error: action.payload }
        },
        clearProductUpdated(state, action) {
            return { ...state, isProductUpdated: false }
        }
    }
});

const { actions, reducer } = productsSlice;

export const { 
    productsRequest, productsSuccess, productsFail,
    productRequest, productSuccess, productFail, // ✨ Added export
    adminProductsRequest, adminProductsSuccess, adminProductsFail,
    clearError,
    newProductRequest, newProductSuccess, newProductsFail, clearProductCreated,
    deleteProductRequest, deleteProductSuccess, deleteProductsFail, clearProductDeleted,
    updateProductRequest, updateProductSuccess, updateProductsFail, clearProductUpdated
} = actions;

export default reducer;

// --- THUNKS ---

export const getProducts = () => async (dispatch) => {
    try {
        dispatch(productsRequest());
        const { data } = await axios.get('/api/v1/products');
        dispatch(productsSuccess(data));
    } catch (error) {
        dispatch(productsFail(error.response?.data?.message || error.message));
    }
};

// ✨ NEW THUNK: Get Single Product (For pre-filling the Update form)
export const getProduct = (id) => async (dispatch) => {
    try {
        dispatch(productRequest());
        const { data } = await axios.get(`/api/v1/product/${id}`);
        dispatch(productSuccess(data));
    } catch (error) {
        dispatch(productFail(error.response?.data?.message || error.message));
    }
};

export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch(adminProductsRequest());
        const { data } = await axios.get('/api/v1/admin/products'); 
        dispatch(adminProductsSuccess(data));
    } catch (error) {
        dispatch(adminProductsFail(error.response?.data?.message || error.message));
    }
};

export const createNewProduct = (productData) => async (dispatch) => {
    try {
        dispatch(newProductRequest());
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        const { data } = await axios.post('/api/v1/admin/product/new', productData, config);
        dispatch(newProductSuccess(data));
    } catch (error) {
        let errorMessage = error.response?.data?.message;
        if (!errorMessage && typeof error.response?.data === 'string') {
            errorMessage = "Server Error: Failed to process request.";
        } else if (!errorMessage) {
            errorMessage = error.message; 
        }
        dispatch(newProductsFail(errorMessage));
    }
};

export const deleteProduct = (id) => async(dispatch) => {
    try {
        dispatch(deleteProductRequest());
        await axios.delete(`/api/v1/admin/product/${id}`);
        dispatch(deleteProductSuccess());
    }
    catch (error) {
        dispatch(deleteProductsFail(error.response?.data?.message || error.message));
    }
}

export const updateProduct = (id, productData) => async(dispatch) => {
    try {
        dispatch(updateProductRequest());
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config);
        dispatch(updateProductSuccess(data));        
    }                       
    catch (error) {
        dispatch(updateProductsFail(error.response?.data?.message || error.message));
    }
}