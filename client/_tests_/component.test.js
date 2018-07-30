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
import Item from '../src/Item';
import Adapter from 'enzyme-adapter-react-16';




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
        //const component = shallow(<App />);
        //expect(component).toHaveLength(1);
        //expect(rendered).toHaveLength(1);
        expect(rendered).toBeTruthy();
        //console.log(rendered.root);
    });

    it('shallow renders our <App /> component', () => {
        const component = shallow(<App />);
        const taskComponent = shallow(<Tasks />);
        //const itemComponent = shallow(<Item tasks=/>);
        //console.log(data);
        //console.log(itemComponent.instance().props);
        expect(taskComponent).toHaveLength(1);
        expect(component).toHaveLength(1);
        //console.log(component.instance());
        //console.log(taskComponent.instance());
        //console.log(itemComponent);
        //console.log(data);
    });
    it('Mount our <App /> component', ()=> {
        const appComp = mount(
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        );
        //console.log(appComp);
    });

    /*it('Testing methods from <Task /> component', () => {
        const component = mount(<ApolloProvider client={client}>
            <Tasks tasks={id: 1, item:"shiz",isDone:false}/>
        </ApolloProvider>);
        //console.log()
        console.log(data);
    });*/

    it('Testing methods from <Task /> component shallow', () => {
        const taskComponent = shallow(<Tasks data={tasks}/>);
        //console.log(taskComponent.state);
    });
    
    it('Item testing', () => {
        const spy = jest.fn();
        const itemComponent = mount(<Item tasks={tasks} checkTask={spy} changeText={spy} deleteTask={spy}/>);
        const checkBox = itemComponent.find('.checkbox').simulate('change');
        //const editButton = itemComponent.find('.edit').simulate('click');
        const deleteButton = itemComponent.find('.delete').simulate('click');
        expect(spy).toHaveBeenCalled();
    });
    describe('Clicking some buttons', () => {
        const spy = jest.fn();
        const wrapper = shallow(<Item tasks={tasks} checkTask={spy}/>);
        //console.log(wrapper);
        //console.log(wrapper.find('.checkbox'));
        //wrapper.find('.checkbox').simulate('click');
    });

});