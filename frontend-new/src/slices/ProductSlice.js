import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
    name: "products",
    initialState: {
        loading: false,
        products: [],
        productsCount: 0,
        error: null 
    },
    reducers: {
        // Renamed to 'productsRequest' (Plural) to match standard convention
        productsRequest(state, action) {
            return {
                loading: true,
                products: []
            }
        },
        // Renamed to 'productsSuccess' (Plural)
        productsSuccess(state, action) {
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.count // Check if your API sends 'count' or 'productsCount'
            }
        },
        productsFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
});

const { actions, reducer } = productsSlice;

export const { 
    productsRequest, 
    productsSuccess, 
    productsFail 
} = actions;

export default reducer;