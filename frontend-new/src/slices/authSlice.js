import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: null
    },
    reducers: {
        registerRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
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
                error: null
            }
        },
        loginRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
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
                error: action.payload
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
    logoutFail
} = actions;

export default reducer;


// --- THUNK (The API Call) ---
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const { data } = await axios.post('/api/v1/login', { email, password });
        dispatch(loginSuccess(data));
    } catch (error) {
        dispatch(loginFail(error.response.data.message || error.message));
    }
};


// ... existing login thunk ...

// --- REGISTER THUNK (Add this) ---
// --- REGISTER THUNK ---
export const register = (userData) => async (dispatch) => {
    try {
        dispatch(registerRequest());
        
        // 👇 CHANGE: Do NOT manually set Content-Type for FormData.
        // Let Axios and the browser handle the boundary automatically.
        const { data } = await axios.post('/api/v1/register', userData);
        
        dispatch(registerSuccess(data));
    } catch (error) {
        dispatch(registerFail(error.response.data.message || error.message));
    }
};


// --- LOAD USER THUNK ---
export const loadUser = () => async (dispatch) => {
    try {
        dispatch(loadUserRequest());
        // This request sends the cookie automatically to check session
        const { data } = await axios.get('/api/v1/myprofile');
        dispatch(loadUserSuccess(data));
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message));
    }
};


export const logout = () => async (dispatch) => {
    try {
        
        // This request sends the cookie automatically to check session
        await axios.get('/api/v1/logout');
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFail(error.response.data.message || error.message));
    }
};