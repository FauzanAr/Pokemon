const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongodb = require('../helpers/databases/mongodb/connection');

class Server {
    constructor() {
        this.server = express();

        this.server.use(cors());
        this.server.use(bodyParser.json());

        this.server.get('/status', (req, res) => {
            res.json({ message: 'server up and running' });
        });
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