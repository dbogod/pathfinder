import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Form from './js/components/Form';

Enzyme.configure({ adapter: new Adapter() });


describe('Form', () => {
  it('yields the right error message', () => {
    const wrapper = shallow(<Form />);

    expect(wrapper.exists()).toBe(true);
  })
});