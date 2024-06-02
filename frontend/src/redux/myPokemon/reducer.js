import { createSlice } from "@reduxjs/toolkit";

const myPokemonSlice = createSlice({
    name: 'myPokemon',
    initialState: {
        data: null,
        loading: false,
        error: null,
        loadingRealase: false,
    },
    reducers: {
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
        releasePokemon: (state) => {
            state.loadingRealase = true;
        },
        releasePokemonSuccess: (state, action) => {
            state.loadingRealase = false;
        },
        releasePokemonFailed: (state, action) => {
            state.loadingRealase = false;
            state.error = action.payload.message;
        },
    },
});

export const myPokemonActions = myPokemonSlice.actions;
export const myPokemonReducer = myPokemonSlice.reducer;