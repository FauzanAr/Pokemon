const request = require('request-promise');
const logger = require('./logger');
const wrapper = require('./wrapper');
const { InternalServiceError } = require('../error');

const GetApi = async (url) => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        json: true,
    };
    try {
        logger.info(`Calling api: ${url}`)
        const result = await request.get(url, options);
        return wrapper.data(result);
    } catch (error) {
        logger.error(`error while getting ${url}: ${error}`);
        return wrapper.error(new InternalServiceError('Error while getting external api!'));
    }
}

module.exports = {
    GetApi,
}