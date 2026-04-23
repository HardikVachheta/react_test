import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../feactures/authSlice'
import productReducer from '../feactures/productSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
    }
})