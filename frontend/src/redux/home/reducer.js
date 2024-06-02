import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        query: { limit: 10, offset: 0 },
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        fetchData: (state) => {
            state.loading = true;
        },
        fetchDataSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        fetchDataFail: (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload.message;
        },
    },
});

export const homeActions = homeSlice.actions;
export const homeReducer = homeSlice.reducer;