const Repository = require('./repositories');
const wrapper = require('../../../helpers/utils/wrapper');
const { NotFoundError, BadRequestError } = require('../../../helpers/error');
const util = require('../utils/helper');
const config = require('../../../helpers/config');

class Pokemon {
    constructor(mongoDb) {
        this.repository = new Repository(mongoDb);
    }

    async getMyPokemon(payload) {
        const result = [];
        const parameter = {
            isVisible: true,
        }
        const pokemon = await this.repository.getPokemon(parameter);
        if(!pokemon || pokemon.err || !pokemon.data) {
            return wrapper.error(new NotFoundError('Pokemon not found!'));
        }

        for (let i = 0; i < pokemon.data.length; i++) {
            const object = {
                name: pokemon.data[i]?.name,
                id: pokemon.data[i]?.pokemonId,
                nickname: pokemon.data[i]?.nickname,
                images: `${config.pokemon.getImage}${pokemon.data[i]?.pokemonId}.${config.pokemon.imageExtension}`
            }

            result.push(object);
        }

        return wrapper.data(result);
    }

    async getAllPokemon(payload) {
        const pokemon = await util.getPokemon(payload);
        if (pokemon.err) {
            return pokemon;
        }

        if (!pokemon || !pokemon.data) {
            return wrapper.error(new NotFoundError('No pokemon found!'));
        }

        for (let i = 0; i < pokemon.data.results.length; i++) {
            const id = pokemon.data.results[i].url.match(/\/pokemon\/(\d+)\//)[1]
            pokemon.data.results[i]['id'] = Number(id);
            pokemon.data.results[i]['images'] = `${config.pokemon.getImage}${id}.${config.pokemon.imageExtension}`;
            delete pokemon.data.results[i].url
        }

        delete pokemon.data.next;
        delete pokemon.data.previous;
        return pokemon;
    }

    async getDetailPokemon(payload) {
        if (!payload.id) {
            return wrapper.error(new BadRequestError('Error no id given!'));
        }

        const pokemon = await util.getDetailPokemon(payload.id);
        return wrapper.data(pokemon.data);
    }

    async catchPokemon(payload) {
        if(!payload.id) {
            return wrapper.error(new BadRequestError('Error no id given!'));
        }

        const id = Number(payload.id);
        const parameter = {
            pokemonId: id
        }
        const catchedPokemon = await this.repository.findPokemon(parameter);
        if (catchedPokemon && catchedPokemon.data) {
            return wrapper.error(new BadRequestError('Pokemon alredy catched!'));
        }

        const pokemon = await util.getDetailPokemon(id);
        if (!pokemon || !pokemon.data) {
            return wrapper.error(new NotFoundError('No pokemon found!'));
        }

        const random = Math.random();
        if (random < 0.5) {
            return wrapper.error(new BadRequestError('Failed to catch, better luck next time!'));
        }

        const createDocument = {
            pokemonId: id,
            isVisible: false,
            countUpdated: -1,
            nickname: '',
            name: pokemon.data.name,
        }

        await this.repository.insertPokemon(createDocument);
        return wrapper.data(createDocument);
    }

    async renamePokemon(payload) {
        const id = Number(payload.id);
        const parameter = {
            pokemonId: id
        }
        const catchedPokemon = await this.repository.findPokemon(parameter);
        if (!catchedPokemon || !catchedPokemon.data || catchedPokemon.err) {
            return wrapper.error(new BadRequestError('No pokemon owned!'));
        }

        const nickname = catchedPokemon.data.countUpdated == -1 ? payload.nickname : `${payload.nickname}-${util.fibonacciRecursive(catchedPokemon.data.countUpdated)}` ;
        const updateDocument = {
            nickname: nickname,
            isVisible: true,
            countUpdated: catchedPokemon.data.countUpdated + 1,
        }

        await this.repository.updatePokemon(parameter, updateDocument);
        
        return wrapper.data();
    }

    async releasePokemon(payload) {
        const id = Number(payload.id);
        const parameter = {
            pokemonId: id
        }
        const catchedPokemon = await this.repository.findPokemon(parameter);
        if (!catchedPokemon || !catchedPokemon.data || catchedPokemon.err) {
            return wrapper.error(new BadRequestError('You have not catch this pokemon!'));
        }

        const randNum = Math.floor(Math.random() * (1000 - 1) + 1);
        const prime = util.isPrime(randNum);
        if (!prime) {
            return wrapper.error(new BadRequestError('Failed to release, better luck next time!'));
        }

        await this.repository.deletePokemon(parameter);

        return wrapper.data(randNum);
    }
}

module.exports = Pokemon;