const service = require('../../../helpers/utils/services');
const config = require('../../../helpers/config');
const wrapper = require('../../../helpers/utils/wrapper');

const getPokemon = async (payload) => {
    const offset = payload.offset ?? '0';
    const limit = payload.limit ?? '10';
    const url = `${config.pokemon.url}${config.pokemon.getPokemon}?offset=${offset}&limit=${limit}`;

    const result = await service.GetApi(url);

    return wrapper.data(result.data);
}

const getDetailPokemon = async (id) => {
    const url = `${config.pokemon.url}${config.pokemon.getPokemon}/${id}/`;
    const result = await service.GetApi(url);
    const data = {
        id: result?.data?.id,
        base_experience: result?.data?.base_experience,
        is_default: result?.data?.is_default,
        height: result?.data?.height,
        weight: result?.data?.weight,
        image: `${config.pokemon.getImage}${result?.data?.id}.${config.pokemon.imageExtension}`,
        name: result?.data?.name,
        moves: result?.data?.moves,
        types: result?.data?.types,
    }
    
    return wrapper.data(data);
}

const fibonacciRecursive = (n) => {
    if (n <= 1) {
        return n
    };

    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

const isPrime = (n) => {
    if (n <= 1) {
        return false; 
    }

    if (n == 2 || n == 3) {
        return true;
    }

    if (n % 2 == 0 || n % 3 == 0) {
        return false;
    }

    for (var i = 5; i <= Math.sqrt(n); i = i + 6){
        if (n % i == 0 || n % (i + 2) == 0) {
            return false; 
        }
    }

    return true; 
}

module.exports = {
    getPokemon,
    getDetailPokemon,
    fibonacciRecursive,
    isPrime,
}