import React from 'react';
import App from '../src/App';
import ReactDOM from 'react-dom';
import { shallow, mount, render, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import fetch from 'node-fetch';
import Tasks from '../src/Tasks';
import TableItem from '../src/TableItem';
import Adapter from 'enzyme-adapter-react-16';
import toJSON from 'enzyme-to-json';




configure({ adapter: new Adapter() });



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
describe('Run <App />', () => {
    it('renders our <App /> component', () => {
        const rendered = renderer.create(
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        );
        expect(rendered).toBeTruthy();
    });

    it('Mount our <App /> component', ()=> {
        const appComp = mount(
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        );
        expect(appComp).toBeTruthy();
    });

    it('Testing methods from <Task /> component shallow', () => {
        const taskComponent = shallow(<Tasks data={tasks}/>);
        taskComponent.setState({term:' '});

        let tree = toJSON(taskComponent);
        expect(tree).toMatchSnapshot();
    });
    

});