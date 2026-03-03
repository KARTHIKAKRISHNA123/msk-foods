import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderDetails: {},
        userOrders: [],
        loading: false, 
        error: null     
    },
    reducers: {
        createOrderRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        createOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                orderDetails: action.payload 
            }
        },
        createOrderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearOrderError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        userOrderRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        userOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                userOrders: action.payload
            }
        },
        userOrderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        // ✨ FIX: Made this plural (orderDetailsRequest)
        orderDetailsRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        orderDetailsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                orderDetails: action.payload
            }
        },
        orderDetailsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
    }
});

const { actions, reducer } = orderSlice;

export const { 
    createOrderRequest,
    createOrderSuccess,
    createOrderFail,
    clearOrderError,
    userOrderRequest,
    userOrderSuccess,
    userOrderFail,
    orderDetailsRequest,
    orderDetailsSuccess,
    orderDetailsFail
} = actions;

export default reducer;


// --- THUNK 1: Create a New Order ---
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch(createOrderRequest()); 
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const { data } = await axios.post(`/api/v1/order/new`, order, config);
        
        dispatch(createOrderSuccess(data.order));
        
    } catch (error) {
        dispatch(createOrderFail(error.response?.data?.message || error.message));
    }
};

// --- THUNK 2: Fetch Logged-in User's Orders ---
export const userOrders = () => async (dispatch) => {
    try {
        dispatch(userOrderRequest()); 
        
        const { data } = await axios.get(`/api/v1/myorders`);
        
        dispatch(userOrderSuccess(data.orders));
        
    } catch (error) {
        dispatch(userOrderFail(error.response?.data?.message || error.message));
    }
};

// --- THUNK 3: Fetch Single Order Details ---
export const orderDetails = (id) => async (dispatch) => {
    try {
        // ✨ FIX: Made these match the plural exports exactly
        dispatch(orderDetailsRequest()); 
        
        const { data } = await axios.get(`/api/v1/order/${id}`);
        
        dispatch(orderDetailsSuccess(data.order));
        
    } catch (error) {
        dispatch(orderDetailsFail(error.response?.data?.message || error.message));
    }
};