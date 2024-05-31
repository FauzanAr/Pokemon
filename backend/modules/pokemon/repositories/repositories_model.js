const joi = require('joi');

const renamePokemon = joi.object({
    id: joi.string().required(),
    nickname: joi.string().required(),
});

const releaseAndCatchPokemon = joi.object({
    id: joi.string().required(),
});

module.exports = {
    renamePokemon,
    releaseAndCatchPokemon,
}