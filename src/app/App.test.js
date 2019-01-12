
import React from "react";
import App from './App';

import { shallow } from 'enzyme';


describe('<App/>', () => {

	it('renders without crashing', () => {
	  var comp = shallow(<App/>);
	  expect(comp).toBeDefined();
	});

});
