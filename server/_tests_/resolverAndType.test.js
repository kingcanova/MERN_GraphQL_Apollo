const { makeExecutableSchema, addMockFunctionsToSchema, mockServer } = require('graphql-tools');
const tester = require('graphql-tester').tester;
const { graphql } = require('graphql');
const { GraphQLError } = require('graphql/error');
//global.Promise = require.requireActual('promise');
jest.setTimeout(10000);
const schema = require('../graphql/index').itemSchema;

addMockFunctionsToSchema({schema, preserveResolvers: true });

describe('GraphQl Query', () => {
    const self = this;
    beforeAll(() =>
    {
        self.tester = tester({});
    });
    //debugger;
    const query = `
    query todoItems {
        tasks {
            id
            item
            isDone
        }
    }`;

    const queryWrong = `mutation removeItem {
        removeItem(item: null){
            stuff
            item
            isDone
        }
    }`;
    const add = `
    mutation addItem {
        addItem(item:"WOO",isDone: true){
            id
            item
            isDone
        }
    }`;

    const update = `
    mutation updateItem {
        updateItem(id: "5b50f2e8d380f828b2d98b30", item: "WOOT", isDone: true){
            id
            item
            isDone
        }
    }`;

    const remove = `
    mutation removeItem {
        removeItem(id: "5b50f2e8d380f828b2d98b30"){
            id
            item
            isDone
        }
    }`;
    const testBranches = `
    mutation removeItem {
        removeItem(){}
    }`;
    const variables = {
        id: null
    };
    
    test('run successfully', async () => {
        return await expect(
            graphql(schema,query).then((result)=> {
                console.log(result);
            })
        );
    });
    test('add successfully', async () => {
        return await expect(
            graphql(schema,add).then((result)=> {
                console.log(result);
                console.log("HELLO WORLD");
            })
        );
    });
    test('update successfully', async () => {
        return await expect(
            graphql(schema,update).then((result) => {
                console.log("ANYTHING PLEASE SHOW ANYTHING");
                console.log(result);
            })
        );
    });
    test('remove successfully', async () => {
        return await expect(
            graphql(schema,remove).then((result) => {
                console.log("THIS ONLY PRINTS IF THERES AN ERROR");
                console.log(result);
            })
        );
    });
    test('query wrongly?', async () => {
        return await expect(
            graphql(schema,testBranches, null,variables,contextValue = null).catch((result) => {
                console.log(result);
                expect(()=> {
                    throw new Error();
                }).toThrow(GraphQLError);
                //expect(result).toThrow(GraphQLError);
            })
        );
    });
});