class Query {
    constructor(mongoDb) {
        this.mongoDb = mongoDb;
    }

    async getPokemon(parameter) {
        const result = await this.mongoDb.findAll('my-list', parameter);
        return result;
    }
}