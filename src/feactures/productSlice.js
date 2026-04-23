import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchProducts = createAsyncThunk(
    'products/fetchAll',
    async () => {
        const response = await axios.get("https://dummyjson.com/products");
        return response.data.products;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: "idle"
    },
    reducers: {
        addProduct: (state, action) => {
            state.items.push(action.payload);
        },
        deleteProduct: (state, action) => {
            state.items = state.items.filter(p => p.id !== action.payload.id);
        },
        updateProduct: (state, action) => {
            const index = state.items.findIndex(p => p.id === action.payload.id)
            if (index !== -1) state.items[index] = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'Succeeded';
        });
    },
});

export const { addProduct, deleteProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;