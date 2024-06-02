import { createAsyncThunk } from "@reduxjs/toolkit";
import { myPokemonActions } from "./reducer";
import axios from 'axios';
import config from "../../Config";

export const fetchMyPokemon = createAsyncThunk(
    'myPokemon/fetchData',
    async (_, { getState, dispatch }) => {
        dispatch(myPokemonActions.fetchData());
        try {
            const response = await axios.get(`${config.backendService.url + config.backendService.path.getMyPokemon}`);
            dispatch(myPokemonActions.fetchDataSuccess(response.data));
        } catch (error) {
            dispatch(myPokemonActions.fetchDataFail(error));
        }
    }
)

export const releasePokemon = createAsyncThunk(
    'myPokemon/releasePokemon',
    async (id, { getState, dispatch }) => {
        dispatch(myPokemonActions.releasePokemon());
        try {
            await axios.post(`${config.backendService.url + config.backendService.path.releasePokemon}/${id}`);
            dispatch(myPokemonActions.releasePokemonSuccess());
            dispatch(fetchMyPokemon());
            return;
        } catch (error) {
            dispatch(myPokemonActions.releasePokemonFailed({ message: "Failed to release!" }));
        }

    }
)