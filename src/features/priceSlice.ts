// src/features/priceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PriceData {
    time: string;
    date: string;
    price: number;
}

interface PriceState {
    priceData: PriceData[];
}

const initialState: PriceState = {
    priceData: [],
};

const priceSlice = createSlice({
    name: 'price',
    initialState,
    reducers: {
        setPriceData: (state, action: PayloadAction<PriceData[]>) => {
            state.priceData = action.payload;
        },
    },
});

export const { setPriceData } = priceSlice.actions;
export default priceSlice.reducer;
