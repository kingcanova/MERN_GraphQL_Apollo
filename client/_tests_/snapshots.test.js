import React from 'react';
import Tasks from '../src/Tasks'
import renderer from 'react-test-renderer';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import fetch from 'node-fetch';
import App from '../src/App';
import TableItem from '../src/TableItem';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:4000/graphql',
        fetch,
    }),
    cache: new InMemoryCache()
});



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

});

const task =
    {
      "id": "5b5f145e605ec80c819f5824",
      "item": "one",
      "isDone": false
    };

const tasks = [
    {
        "id": "5b5f145e605ec80c819f5825",
        "item": "one",
        "isDone": true
    },
    {
        "id": "5b5f145e605ec80c819f5826",
        "item": "two",
        "isDone": true
    }
];

test('Snapshot of App component', () => {
    const component = renderer.create(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    console.log(tree);
});

test('Snapshot of Tasks component take two', () => {
    const component = renderer.create(
        <ApolloProvider client={client}>
            <Tasks data={tasks}/>
        </ApolloProvider> 
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    //console.log(tree);

    //Try onchange event
    let submit = tree.children[0];
    //console.log(submit);
    let input = submit.children[0];
    input.props.value = "cool"
    let fakeEvent = {
        target: {
            value: "cool"
        }
    };
    input.props.onChange(fakeEvent);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    //TESTING SUBMIT
    let e = new Event("e");
    submit = tree.children[0];
    submit.props.onSubmit(e);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Snapshot test of Tasks component TAKE 3', () => {
    const component = renderer.create(
        <ApolloProvider client={client}>
            <Tasks data={tasks}/>
        </ApolloProvider> 
    );
    let e = new Event("e");
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    //Trying to show warning PLEASE 
    component.getInstance().setState({term: ' ', warning:true});
    tree = component.toJSON();
    let submit = tree.children[0];
    //console.log(component.getInstance().state);
    let input = submit.children[0];
    input.props.value = " ";
    //console.log(submit);
    //console.log(submit.children[0]);
    submit.props.onSubmit(e);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Snapshot of TableItem component', () => {
    const component = renderer.create(
        <ApolloProvider client={client}>
            <TableItem task={task} />
        </ApolloProvider>
    );
    //console.log(component.getInstance());
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    //console.log(tree);

    //Test that editbutton works and spawns text input
    let editButton = tree.children[1];
    editButton.props.onClick();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    //console.log(tree);

    //Test entering text into textbox
    let textBox = tree.children[0];
    textBox.props.value = "wow";
    let fakeEvent = {
        target: {
            value: "wow"
        }
    };
    //console.log(fakeEvent.target.value);
    textBox.props.onChange(fakeEvent);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    //console.log(textBox);

    //Test hitting the save button
    let saveButton = tree.children[2];
    saveButton.props.onClick();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    //console.log(saveButton);
});
