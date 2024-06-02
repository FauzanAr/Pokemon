import { createSlice } from '@reduxjs/toolkit'

const detailCardSlice = createSlice({
    name: 'detailCard',
    initialState: {
        data: null,
        loading: false,
        loadingCatch: false,
        error: null,
        successCatchPokemon: false,
        successRenamePokemon: false,
    },
    reducers: {
        fetchData: (state) => {
            state.loading = true;
        },
        fetchDataSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            state.successCatchPokemon = false;
        },
        fetchDataFail: (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload.message;
        },
        catchPokemon: (state) => {
            state.loadingCatch = true;
        },
        catchPokemonSuccess: (state, action) => {
            state.loadingCatch = false;
            state.successCatchPokemon = true;
        },
        catchPokemonFailed: (state, action) => {
            state.loadingCatch = false;
            state.error = action.payload.message
        },
        renamePokemonSuccess: (state, action) => {
            state.successCatchPokemon = false;
            state.successRenamePokemon = true;
        }
    },
});

export const detailCardActions = detailCardSlice.actions;
export const detailCardReducer = detailCardSlice.reducer;