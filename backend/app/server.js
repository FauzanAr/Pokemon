const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongodb = require('../helpers/databases/mongodb/connection');
const pokemonHandler = require('../modules/pokemon/handlers/api');

class Server {
    constructor() {
        this.server = express();

        this.server.use(cors());
        this.server.use(bodyParser.json());

        this.server.get('/status', (req, res) => {
            res.json({ message: 'server up and running' });
        });

        //Modules pokemon
        this.server.get('/pokemon/v1/', pokemonHandler.getAllPokemon);
        this.server.get('/pokemon/v1/my', pokemonHandler.getAllMyPokemon);
        this.server.get('/pokemon/v1/:id', pokemonHandler.getDetailPokemon);
        this.server.post('/pokemon/v1/catch/:id', pokemonHandler.catchPokemon);
        this.server.post('/pokemon/v1/rename/:id', pokemonHandler.renamePokemon);
        this.server.post('/pokemon/v1/release/:id', pokemonHandler.releasePokemon);
    }

    async init(port) {
        await Promise.all([
            mongodb.init()
        ]);
        this.server.listen(port, () => {
            console.log(`App running on port: ${port}`);
        });
    }
}

module.exports = Server;