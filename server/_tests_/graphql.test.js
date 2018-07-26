const tester = require('graphql-tester').tester;

describe('Graphql quieries should be able to', function()
{
    const self = this;
    beforeAll(() =>
    {
        self.test = tester({
            url: 'http://localhost:4000/graphql',
            contentType: 'application/json'
        });
    });
    it('add a new Item', done => {
        self
            .test(
                JSON.stringify({
                    query: `mutation addItem($item: String!, $isDone: Boolean!){
                        addItem(item: $item, isDone: $isDone){
                          id
                          item
                          isDone
                        }
                      }`,
                      variables: {
                          item: "Get new Item added from unit test",
                          isDone: true
                      }
                })
            ).then(res => {
                self.tempID = res.data.addItem.id;
                expect(res.data.addItem.item).toBe("Get new Item added from unit test");
                expect(res.status).toBe(200);
                expect(res.success).toBe(true);
                done();
            }).catch(err => {
                expect(err).toBe(null);
                done();
            });
    });
    it('fetch previously added test item with all correct variables', done =>{
        self
            .test(
                JSON.stringify({
                    query:`query todoList {
                        tasks {
                          id
                          item
                          isDone
                        }
                      }`,
                })
            ).then(res => {
                //console.log(res.data.tasks[0]);
                expect(res.data.tasks[0].id).toBe(self.tempID);
                expect(res.data.tasks[0].item).toBe("Get new Item added from unit test");
                expect(res.data.tasks[0].isDone).toBe(true);
                expect(res.success).toBe(true);
                expect(res.status).toBe(200);
                done();
            }).catch(err => {
                expect(err).toBe(null);
                done();
            })
    })
    it('update item value and isDone value', done => {
        self
            .test(
                JSON.stringify({
                    query:`mutation updateItem($id: String!, $item: String! $isDone: Boolean!) {
                        updateItem(id: $id, item: $item, isDone: $isDone){
                            id
                            item
                            isDone
                        }
                    }`,
                    variables: {
                        id: self.tempID,
                        item: "Updated the item to have a new item value",
                        isDone: false

                    }
                })
            ).then(res => {
                expect(res.data.updateItem.id).toBe(self.tempID);
                expect(res.data.updateItem.item).toBe("Updated the item to have a new item value");
                expect(res.data.updateItem.isDone).toBe(false);
                expect(res.success).toBe(true);
                expect(res.status).toBe(200);
                done();
            })
    })
    it('delete the previously added test item', done => {
        self
            .test(
                JSON.stringify({
                    query:`mutation removeItem($id: String!){
                        removeItem(id:$id){
                            id
                            item
                            isDone
                        }
                    }`,
                    variables: {
                        id: self.tempID
                    }
                })
            ).then(res => {
                expect(res.data.removeItem.id).toBe(self.tempID);
                expect(res.status).toBe(200);
                expect(res.success).toBe(true);
                done();
            }).catch(err => {
                expect(err).toBe(null);
                done();
            })
    })
    it('not allow an item to be added without the item variable', done => {
        self
            .test(
                JSON.stringify({
                    query: `mutation addItem($item: String!, $isDone: Boolean!){
                        addItem(item: $item, isDone: $isDone){
                          id
                          item
                          isDone
                        }
                      }`,
                      variables: {
                          isDone: false
                      }
                })
            ).then(res => {
                //console.log(res);
                expect(res.data).toBe(undefined);
                expect(res.status).toBe(500);
                expect(res.success).toBe(false);
                done();
            }).catch(err => {
                expect(err).toBe(null);
                done();
            })
    });
    it('not allow an item to be added without the isDone variable', done => {
        self
            .test(
                JSON.stringify({
                    query: `mutation addItem($item: String!, $isDone: Boolean!){
                        addItem(item: $item, isDone: $isDone){
                          id
                          item
                          isDone
                        }
                      }`,
                      variables: {
                          item: "Should not be an item!"
                      }
                })
            ).then(res => {
                //console.log(res);
                expect(res.data).toBe(undefined);
                expect(res.status).toBe(500);
                expect(res.success).toBe(false);
                done();
            }).catch(err => {
                expect(err).toBe(null);
                done();
            })
    });
})