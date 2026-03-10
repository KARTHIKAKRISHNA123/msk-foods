import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderDetails: {},
        userOrders: [],
        adminOrders: [],
        loading: false,
        isOrderDeleted: false, 
        isOrderUpdated: false,
        error: null     
    },
    reducers: {
        createOrderRequest(state, action) {
            return { ...state, loading: true }
        },
        createOrderSuccess(state, action) {
            return { ...state, loading: false, orderDetails: action.payload }
        },
        createOrderFail(state, action) {
            return { ...state, loading: false, error: action.payload }
        },
        clearOrderError(state, action) {
            return { ...state, error: null }
        },
        userOrderRequest(state, action) {
            return { ...state, loading: true }
        },
        userOrderSuccess(state, action) {
            return { ...state, loading: false, userOrders: action.payload }
        },
        userOrderFail(state, action) {
            return { ...state, loading: false, error: action.payload }
        },
        orderDetailsRequest(state, action) {
            return { ...state, loading: true }
        },
        orderDetailsSuccess(state, action) {
            return { ...state, loading: false, orderDetails: action.payload }
        },
        orderDetailsFail(state, action) {
            return { ...state, loading: false, error: action.payload }
        },
        adminOrderRequest(state, action) {
            return { ...state, loading: true }
        },
        adminOrderSuccess(state, action) {
            return { ...state, loading: false, adminOrders: action.payload }
        },
        adminOrderFail(state, action) {
            return { ...state, loading: false, error: action.payload }
        },
        deleteOrderRequest(state, action) {
            return { ...state, loading: true }
        },
        deleteOrderSuccess(state, action) {
            return { ...state, loading: false, isOrderDeleted: true }
        },
        deleteOrderFail(state, action) {
            return { ...state, loading: false, error: action.payload }
        },
        updateOrderRequest(state, action) {
            return { ...state, loading: true }
        },
        updateOrderSuccess(state, action) {
            return { ...state, loading: false, isOrderUpdated: true }
        },
        // ✨ FIX: Changed from userOrderFail to updateOrderFail
        updateOrderFail(state, action) {
            return { ...state, loading: false, error: action.payload }
        },
        clearOrderDeleted(state, action) {
            return { ...state, isOrderDeleted: false }
        },
        clearOrderUpdated(state, action) {
            return { ...state, isOrderUpdated: false }
        }
    }
});

const { actions, reducer } = orderSlice;

export const { 
    createOrderRequest, createOrderSuccess, createOrderFail, clearOrderError,
    userOrderRequest, userOrderSuccess, userOrderFail,
    orderDetailsRequest, orderDetailsSuccess, orderDetailsFail,
    adminOrderRequest, adminOrderSuccess, adminOrderFail,
    deleteOrderRequest, deleteOrderSuccess, deleteOrderFail,
    updateOrderRequest, updateOrderSuccess, updateOrderFail, // ✨ Now matches perfectly
    clearOrderDeleted, clearOrderUpdated
} = actions;

export default reducer;


// --- THUNK 1: Create a New Order ---
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch(createOrderRequest()); 
        const config = { headers: { 'Content-Type': 'application/json' } }
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
        dispatch(orderDetailsRequest()); 
        const { data } = await axios.get(`/api/v1/order/${id}`);
        dispatch(orderDetailsSuccess(data.order));
    } catch (error) {
        dispatch(orderDetailsFail(error.response?.data?.message || error.message));
    }
};

// --- THUNK 4: Admin Fetch All Orders ---
export const adminOrders = () => async(dispatch) => {
    try {
        dispatch(adminOrderRequest());
        const { data } = await axios.get(`/api/v1/admin/orders`);
        dispatch(adminOrderSuccess(data.orders));
    }
    catch (error) {
        dispatch(adminOrderFail(error.response?.data?.message || error.message));
    }
};

// ✨ FIX: ADDED MISSING THUNK 5 - Admin Update Order Status
export const updateOrder = (id, orderData) => async(dispatch) => {
    try {
        dispatch(updateOrderRequest());
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData, config);
        dispatch(updateOrderSuccess(data));        
    }                       
    catch (error) {
        dispatch(updateOrderFail(error.response?.data?.message || error.message));
    }
};

// ✨ FIX: ADDED MISSING THUNK 6 - Admin Delete Order
export const deleteOrder = (id) => async(dispatch) => {
    try {
        dispatch(deleteOrderRequest());
        await axios.delete(`/api/v1/admin/order/${id}`);
        dispatch(deleteOrderSuccess());
    }
    catch (error) {
        dispatch(deleteOrderFail(error.response?.data?.message || error.message));
    }
};