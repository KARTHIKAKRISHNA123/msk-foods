import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// ✨ IMPORT the reset action from your cart slice
import { orderCompleted } from './cartSlice'; 

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: true,
        isAuthenticated: false,
        user: null,
        error: null,
        isUpdated: false,
        message: null,
        success: false 
    },
    reducers: {
        registerRequest(state, action) {
            return { ...state, loading: true }
        },
        registerSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        registerFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null,
                message: null
            }
        },
        loginRequest(state, action) {
            return { ...state, loading: true }
        },
        loginSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loginFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        loadUserRequest(state, action) {
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
            }
        },
        loadUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loadUserFail(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: null 
            }
        },
        logoutSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null
            }
        },
        logoutFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
        updateProfileRequest(state, action) {
            return {
                ...state,
                loading: true,
                isUpdated: false
            }
        },
        updateProfileSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                isUpdated: true
            }
        },
        updateProfileFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updatePasswordRequest(state, action) {
            return {
                ...state,
                loading: true,
                isUpdated: false
            }
        },
        updatePasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUpdated: true
            }
        },
        updatePasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearUpdateProfile(state, action) {
            return {
                ...state,
                isUpdated: false
            }
        },
        forgotPasswordRequest(state, action) {
            return {
                ...state,
                loading: true,
                message: null
            }
        },
        forgotPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        },
        forgotPasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        resetPasswordRequest(state, action) {
            return {
                ...state,
                loading: true,
                success: false
            }
        },
        resetPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                success: true 
            }
        },
        resetPasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            }
        }
    }
});

const { actions, reducer } = authSlice;

export const { 
    loginRequest, 
    loginSuccess, 
    loginFail,
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    clearUpdateProfile,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
} = actions;

export default reducer;


// --- THUNK (The API Calls) ---

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const { data } = await axios.post('/api/v1/login', { email, password });
        dispatch(loginSuccess(data));
    } catch (error) {
        dispatch(loginFail(error.response.data.message || error.message));
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        dispatch(registerRequest());
        const { data } = await axios.post('/api/v1/register', userData);
        dispatch(registerSuccess(data));
    } catch (error) {
        dispatch(registerFail(error.response.data.message || error.message));
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch(loadUserRequest());
        const { data } = await axios.get('/api/v1/myprofile');
        dispatch(loadUserSuccess(data));
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message));
    }
};

// ✨ MODIFIED: Added Cart Clearing Logic
// ... existing imports

// ✨ MODIFIED for Persistence: Removed cart clearing logic
export const logout = () => async (dispatch) => {
    try {
        await axios.get('/api/v1/logout');
        
        // 1. Only Clear Redux Auth state
        dispatch(logoutSuccess());

        // ❌ REMOVED: localStorage.removeItem('cartItems');
        // ❌ REMOVED: dispatch(orderCompleted());
        // This ensures the cart stays in the browser even after logging out.

    } catch (error) {
        dispatch(logoutFail(error.response?.data?.message || error.message));
    }
};

// ... rest of the file

export const update = (userData) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());
        const { data } = await axios.put('/api/v1/update', userData);
        dispatch(updateProfileSuccess(data));
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message || error.message));
    }
};

export const changePassword = (userData) => async (dispatch) => {
    try {
        dispatch(updatePasswordRequest());
        await axios.put('/api/v1/password/change', userData);
        dispatch(updatePasswordSuccess());
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message || error.message));
    }
};

export const forgotPassword = (userData) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest());
        const { data } = await axios.post('/api/v1/password/forgot', userData);
        dispatch(forgotPasswordSuccess(data.message));
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message || error.message));
    }
};

export const resetPassword = (userData, token) => async (dispatch) => {
    try {
        dispatch(resetPasswordRequest());
        const { data } = await axios.post(`/api/v1/password/reset/${token}`, userData);
        dispatch(resetPasswordSuccess(data));
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message || error.message));
    }
};