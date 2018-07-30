import React from 'react';
import Tasks from '../src/Tasks'
import renderer from 'react-test-renderer';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import fetch from 'node-fetch';
import Item from '../src/Item';
import App from '../src/App';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:4000/graphql',
        fetch,
    }),
    cache: new InMemoryCache()
});

const tasks = [
    {
      "id": "5b5f145e605ec80c819f5824",
      "item": "one",
      "isDone": false
    }
  ];


test('Snapshot of Tasks component', () => {
    const component = renderer.create(
        <ApolloProvider client={client}>
            <Tasks data={tasks}/>
        </ApolloProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    //console.log("TASKS", tree);
    const form = tree.children[0];
    const itemDiv = tree.children[1];
    //console.log(itemDiv.children[0].children[0].children[0].children[0].children[0]);
    const itemCheckbox = itemDiv.children[0].children[0].children[0].children[0].children[0];

    //console.log(deleteButton)
    
    itemCheckbox.props.onChange();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    const deleteButton = itemDiv.children[0].children[0].children[0].children[0].children[2];
    deleteButton.props.onClick();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    console.log(form);
    //e = null;
    const textBox = form.children[0];
    console.log(textBox);
    //textBox.props.onChange();
    //form.props.onSubmit();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Snapshot of App component', () => {
    const component = renderer.create(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    //console.log(tree);
    //const itemChild = tree.children[0].children[0].children[0];
    //console.log("ITEMCHILD ",itemChild);
});

test('Snapshot of Item component', () => {
    const component = renderer.create(
        <ApolloProvider client={client}>
            <Item tasks={tasks}/>
        </ApolloProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    //console.log(tree);

    //console.log(tree.children[0].children);
    const child = tree.children[0].children[0];
    //console.log("CHILD: ",child);
    //child.props.onChange();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})