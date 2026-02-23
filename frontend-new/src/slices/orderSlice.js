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
                // ✨ FIX: Changed from action.payload.order to action.payload
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
                // ✨ FIX: Just use action.payload
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
    userOrderFail
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
// ✨ ADDED: This will fetch the order history for your "My Orders" page
export const userOrders = () => async (dispatch) => {
    try {
        dispatch(userOrderRequest()); 
        
        // Note: Check your backend route. Usually it's /api/v1/myorders or /api/v1/orders/me
        const { data } = await axios.get(`/api/v1/myorders`);
        
        dispatch(userOrderSuccess(data.orders));
        
    } catch (error) {
        dispatch(userOrderFail(error.response?.data?.message || error.message));
    }
};