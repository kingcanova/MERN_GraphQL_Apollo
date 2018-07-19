module.exports = {
    //MongoDB configuration
    development: {
        db: 'mongodb://127.0.0.1/graphql',
        app: {
            name: 'graphql'
        }
    },
    production: {
        db: 'mongodb://testUser:password@localhost:27017/mern_practice',
        app: {
            name: 'graphql'
        }
    }
};