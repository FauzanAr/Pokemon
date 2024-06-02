import { createAsyncThunk } from "@reduxjs/toolkit";
import { detailCardActions } from "./reducer";
import axios from 'axios';
import config from '../../Config';
import { myPokemonActions } from "../myPokemon/reducer";
import { fetchMyPokemon } from "../myPokemon/action";

export const fetchDetailCard = createAsyncThunk(
    'detailCard/fetchData',
    async (id, { getState, dispatch }) => {
        dispatch(detailCardActions.fetchData());
        try {
            const response = await axios.get(`${config.backendService.url + config.backendService.path.getAllPokemon}/${id}`);
            dispatch(detailCardActions.fetchDataSuccess(response.data));
            return
            // handle if success but error 400, 404, or 500 etc.
        } catch (error) {
            dispatch(detailCardActions.fetchDataFail(error))
            return
        }
    }
)

export const catchPokemon = createAsyncThunk(
    'detailCard/catchPokemon',
    async (id, { getState, dispatch }) => {
        dispatch(detailCardActions.catchPokemon());
        try {
            const response = await axios.post(`${config.backendService.url + config.backendService.path.catchPokemon}/${id}`);
            if (response && response.data && response.data.success) {
                return dispatch(detailCardActions.catchPokemonSuccess())
            }
            dispatch(detailCardActions.catchPokemonFailed({ message: 'Failed to Catch!' }));
            return
        } catch (error) {
            if (error?.response?.data?.message == 'Pokemon alredy catched!') {
                return dispatch(detailCardActions.catchPokemonSuccess())
            }

            dispatch(detailCardActions.catchPokemonFailed(error))
            return
        }
    }
)

export const renamePokemon = createAsyncThunk(
    'detailCard/renamePokemonSuccess',
    async (payload, { getState, dispatch }) => {
        const data = {
            nickname: payload.name
        }
        await axios.post(`${config.backendService.url + config.backendService.path.renamePokemon}/${payload.id}`, data);
        dispatch(detailCardActions.renamePokemonSuccess())
        dispatch(fetchMyPokemon())
    }
)