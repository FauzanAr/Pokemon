import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { homeReducer } from './home/reducer'
import { detailCardReducer } from './detailCard/reducer';
import { myPokemonReducer } from './myPokemon/reducer';

const rootReducer = combineReducers({
    home: homeReducer,
    detailCard: detailCardReducer,
    myPokemon: myPokemonReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;