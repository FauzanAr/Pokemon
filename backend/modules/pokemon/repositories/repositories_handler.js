const Pokemon = require('./domain');
const MongoDb = require('../../../helpers/databases/mongodb/db');

const mongoDb = new MongoDb();
const pokemon = new Pokemon(mongoDb);

const getAllPokemon = async (payload) => {
    const getData = async () => {
        return await pokemon.getAllPokemon(payload);
    };
    const result = await getData();
    return result;
}

const getDetailPokemon = async (payload) => {
    const getData = async () => {
        return await pokemon.getDetailPokemon(payload);
    };
    const result = await getData();
    return result;
}

const catchPokemon = async (payload) => {
    const getData = async () => {
        return await pokemon.catchPokemon(payload);
    };
    const result = await getData();
    return result;
}

const renamePokemon = async (payload) => {
    const getData = async () => {
        return await pokemon.renamePokemon(payload);
    };
    const result = await getData();
    return result;
}

const releasePokemon = async (payload) => {
    const getData = async () => {
        return await pokemon.releasePokemon(payload);
    };
    const result = await getData();
    return result;
}

const getMyPokemon = async (payload) => {
    const getData = async () => {
        return await pokemon.getMyPokemon(payload);
    };
    const result = await getData();
    return result;
}

module.exports = {
    getAllPokemon,
    getDetailPokemon,
    catchPokemon,
    renamePokemon,
    releasePokemon,
    getMyPokemon,
}