const {MongoClient} = require('mongodb');


describe('insert', () => {

    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__);
        db = await connection.db(global.__MONGO_DB_NAME__);
    });

    afterAll(async () => {
        await connection.close();
        await db.close();
    });
  

    it('should return list of tasks from collection', async () =>{
        const tasks = db.collection('files')

        tasks.insertMany([
            {item:"First Item", isDone: false},
            {item:"Second Item", isDone: false},
            {item:"Third Item", isDone: true},
            {item:"Fourth Item", isDone: false}
        ]);

        const returnedTasks = await tasks.find({},{item: 1,isDone: 1}).toArray();

        expect(returnedTasks).toMatchObject([
            {item:"First Item", isDone: false},
            {item:"Second Item", isDone: false},
            {item:"Third Item", isDone: true},
            {item:"Fourth Item", isDone: false}
        ]);
    });
});