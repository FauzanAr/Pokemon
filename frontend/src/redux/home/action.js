import { createAsyncThunk } from '@reduxjs/toolkit'
import { homeActions } from './reducer'
import config from '../../Config'
import axios from 'axios'

export const setHomeQuery = (limit, offset) => {
    return {
        type: 'SET_HOME_QUERY',
        payload: { limit, offset },
    }
}

export const fetchHomeData = createAsyncThunk(
    'home/fetchData',
    async(_, { getState, dispatch }) => {
        const { query } = getState().home;
        dispatch(homeActions.fetchData());
        try {
            const response = await axios.get(`${config.backendService.url + config.backendService.path.getAllPokemon}?limit=${query.limit}&offset=${query.offset}`);
            dispatch(homeActions.fetchDataSuccess(response.data));
            // handle if success but error 400, 404, or 500 etc. 
        } catch (error) {
            dispatch(homeActions.fetchDataFail(error))
        }
    }
)