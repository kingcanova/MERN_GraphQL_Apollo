import React from 'react';
import App from '../src/App';
//import { shallow } from '../enzyme';
import renderer from 'react-test-renderer';

describe('Run <App />', () => {
    it('renders our <App /> component', () => {
        const rendered = renderer.create(
            <App />
        );
        //const component = shallow(<App />);
        //expect(component).toHaveLength(1);
        console.log(rendered);
    });
});