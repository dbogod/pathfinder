import React from 'react';
import Enzyme, {shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import Errors from '../js/components/Errors';

Enzyme.configure({ adapter: new Adapter() });

describe('Errors component', () => {
  it('renders', () => {
    const wrapper = shallow(<Errors isSelectError={true} />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.pathfinder__error-message').hasClass('pathfinder__error-message--show')).toBe(true);
  });

  it('renders', () => {
    const wrapper = shallow(<Errors isSelectError={false} />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.pathfinder__error-message').hasClass('pathfinder__error-message--show')).toBe(false);
  });
});