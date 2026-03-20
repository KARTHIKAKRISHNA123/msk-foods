import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        users: [],
        user: {},
        isUserUpdated: false,
        isUserDeleted: false,
        error: null
    },
    reducers: {
        // --- FETCH ALL USERS (ADMIN) ---
        usersRequest(state, action) {
            return { ...state, loading: true }
        },
        usersSuccess(state, action) {
            return { ...state, loading: false, users: action.payload }
        },
        usersFail(state, action) {
            return { ...state, loading: false, error: action.payload }
        },

        // --- FETCH SINGLE USER (ADMIN) ---
        userDetailsRequest(state, action) {
            return { ...state, loading: true }
        },
        userDetailsSuccess(state, action) {
            return { ...state, loading: false, user: action.payload }
        },
        userDetailsFail(state, action) {
            return { ...state, loading: false, error: action.payload }
        },

        // --- DELETE USER (ADMIN) ---
        deleteUserRequest(state, action) {
            return { ...state, loading: true }
        },
        deleteUserSuccess(state, action) {
            return { ...state, loading: false, isUserDeleted: true }
        },
        deleteUserFail(state, action) {
            return { ...state, loading: false, error: action.payload }
        },
        clearUserDeleted(state, action) {
            return { ...state, isUserDeleted: false }
        },

        // --- UPDATE USER (ADMIN) ---
        updateUserRequest(state, action) {
            return { ...state, loading: true }
        },
        updateUserSuccess(state, action) {
            return { ...state, loading: false, isUserUpdated: true }
        },
        updateUserFail(state, action) {
            return { ...state, loading: false, error: action.payload }
        },
        clearUserUpdated(state, action) {
            return { ...state, isUserUpdated: false }
        },

        // --- CLEAR ERRORS ---
        clearError(state, action) {
            return { ...state, error: null }
        }
    }
});

const { actions, reducer } = userSlice;

export const { 
    usersRequest, usersSuccess, usersFail,
    userDetailsRequest, userDetailsSuccess, userDetailsFail,
    deleteUserRequest, deleteUserSuccess, deleteUserFail, clearUserDeleted,
    updateUserRequest, updateUserSuccess, updateUserFail, clearUserUpdated,
    clearError
} = actions;

export default reducer;

// =========================================================================
// THUNKS (API CALLS)
// =========================================================================

// --- THUNK 1: Get All Users ---
export const getUsers = () => async (dispatch) => {
    try {
        dispatch(usersRequest());
        const { data } = await axios.get(`/api/v1/admin/users`);
        dispatch(usersSuccess(data.users));
    } catch (error) {
        dispatch(usersFail(error.response?.data?.message || error.message));
    }
};

// --- THUNK 2: Get Single User Details ---
export const getUser = (id) => async (dispatch) => {
    try {
        dispatch(userDetailsRequest());
        const { data } = await axios.get(`/api/v1/admin/user/${id}`);
        dispatch(userDetailsSuccess(data.user));
    } catch (error) {
        dispatch(userDetailsFail(error.response?.data?.message || error.message));
    }
};

// --- THUNK 3: Update User (e.g., Change Role) ---
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch(updateUserRequest());
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config);
        dispatch(updateUserSuccess(data));
    } catch (error) {
        dispatch(updateUserFail(error.response?.data?.message || error.message));
    }
};

// --- THUNK 4: Delete User ---
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch(deleteUserRequest());
        await axios.delete(`/api/v1/admin/user/${id}`);
        dispatch(deleteUserSuccess());
    } catch (error) {
        dispatch(deleteUserFail(error.response?.data?.message || error.message));
    }
};

