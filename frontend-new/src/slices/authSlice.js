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
        forgotPasswordRequest(state, action) {
            return {
                ...state,
                loading: true,
                
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
                
            }
        },
        resetPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                
                
                
            }
        },
        resetPasswordFail(state, action) {
            return {
                ...state,
                loading: false,
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
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
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


export const update = (userData) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());
        
        // 👇 CHANGE: Do NOT manually set Content-Type for FormData.
        // Let Axios and the browser handle the boundary automatically.
        const { data } = await axios.put('/api/v1/update', userData);
        
        dispatch(updateProfileSuccess(data));
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message || error.message));
    }
};


export const changePassword = (userData) => async (dispatch) => {
    try {
        dispatch(updatePasswordRequest());
        
        // 👇 CHANGE: Do NOT manually set Content-Type for FormData.
        // Let Axios and the browser handle the boundary automatically.
        await axios.put('/api/v1/password/change', userData);
        
        dispatch(updatePasswordSuccess());
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message || error.message));
    }
};


export const forgotPassword = (userData) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest());
        
        // 👇 CHANGE: Do NOT manually set Content-Type for FormData.
        // Let Axios and the browser handle the boundary automatically.
        const { data } = await axios.put('/api/v1/password/forgot', userData);
        
        dispatch(forgotPasswordSuccess(data));
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message || error.message));
    }
};

export const resetPassword = (userData) => async (dispatch) => {
    try {
        dispatch(resetPasswordRequest());
        
        // 👇 CHANGE: Do NOT manually set Content-Type for FormData.
        // Let Axios and the browser handle the boundary automatically.
        const { data } = await axios.put('/api/v1/password/reset', userData);
        
        dispatch(resetPasswordSuccess(data));
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message || error.message));
    }
};
