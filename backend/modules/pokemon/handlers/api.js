const repositoryHandler = require('../repositories/repositories_handler');
const wrapper = require('../../../helpers/utils/wrapper');
const validator = require('../../../helpers/utils/validator');
const model = require('../repositories/repositories_model');

const getAllPokemon = async (req, res) => {
    const payload = {
        offset: req.query?.offset,
        limit: req.query?.limit,
    };
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'Get All Pokemon Success');
    };
    sendResponse(await repositoryHandler.getAllPokemon(payload));
}

const getDetailPokemon = async (req, res) => {
    const payload = {
        id: req.params.id
    };
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'Get Pokemon Success');
    };
    sendResponse(await repositoryHandler.getDetailPokemon(payload));
}

const catchPokemon = async (req, res) => {
    const payload = {
        id: req.params.id
    };
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'Catch Pokemon Success');
    };
    sendResponse(await repositoryHandler.catchPokemon(payload));
}

const renamePokemon = async (req, res) => {
    const payload = {
        id: req.params.id,
        ...req.body,
    };
    const validatedPayload = validator.isValidPayload(payload, model.renamePokemon);
    const updateData = async (result) => {
        if (result.err) {
            return result;
        }

        return await repositoryHandler.renamePokemon(payload);
    }
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'Rename pokemon success');
    };
    sendResponse(await updateData(validatedPayload));
}

const releasePokemon = async (req, res) => {
    const payload = {
        id: req.params.id,
    };
    const validatedPayload = validator.isValidPayload(payload, model.releaseAndCatchPokemon);
    const updateData = async (result) => {
        if (result.err) {
            return result;
        }

        return await repositoryHandler.releasePokemon(payload);
    }
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'Release pokemon success');
    };
    sendResponse(await updateData(validatedPayload));
}

const getAllMyPokemon = async (req, res) => {
    const payload = {
        offset: req.query?.offset,
        limit: req.query?.limit,
    };
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'Get All My Pokemon Success');
    };
    sendResponse(await repositoryHandler.getMyPokemon(payload));
}

module.exports = {
    getAllPokemon,
    getDetailPokemon,
    catchPokemon,
    renamePokemon,
    releasePokemon,
    getAllMyPokemon,
}