class Repository {
    constructor(mongoDb) {
        this.mongoDb = mongoDb;
    }

    async getPokemon(parameter) {
        const result = await this.mongoDb.findAll('my-list', parameter);
        return result;
    }

    async findPokemon(parameter) {
        const result = await this.mongoDb.findOne('my-list', parameter);
        return result;
    }

    async insertPokemon(document) {
        const result = await this.mongoDb.insertOne('my-list', document);
        return result;
    }

    async updatePokemon(parameter, document) {
        const result = await this.mongoDb.updateOne('my-list', parameter, document);
        return result;
    }

    async deletePokemon(parameter) {
        const result = await this.mongoDb.deleteOne('my-list', parameter);
        return result;
    }
}

module.exports = Repository;