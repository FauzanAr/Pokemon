const config = {
    backendService: {
        url: 'http://localhost:9000',
        path: {
            getAllPokemon: '/pokemon/v1',
            getMyPokemon: '/pokemon/v1/my',
            catchPokemon: '/pokemon/v1/catch',
            renamePokemon: '/pokemon/v1/rename',
            releasePokemon: '/pokemon/v1/release',
        },
    },
};

export default config;