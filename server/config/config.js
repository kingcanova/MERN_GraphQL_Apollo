//This config.js file helps set up our local mongo database connection

// Connect to `mern_practice` local mongo database
var MONGO_URL = 'mongodb://testUser:password@localhost:27017/mern_practice';

//export async function which gets tasks from tasks collection
module.exports = {
    production: {
        db: MONGO_URL,
        app: {
            name: 'MERN stack with GraphQL and Apollo'
        }
    }
};