import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Result from '../js/components/Result';

Enzyme.configure({ adapter: new Adapter() });

describe('Result component', () => {
  it('renders', () => {
    const wrapper = shallow(<Result isResult={true} distance='' path='' />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.pathfinder__result').hasClass('pathfinder__result--show')).toBe(true);
  });

  it('does not have display:block class', () => {
    const wrapper = shallow(<Result isResult={false} distance='' path='' />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.pathfinder__result').hasClass('pathfinder__result--show')).toBe(false);
  });

  it('displays the distance', () => {
    let wrapper = shallow(<Result isResult={true} distance='5' path='' />);

    expect(wrapper.find('#pathfinder__result-distance').text()).toEqual('5');

    wrapper = shallow(<Result isResult={true} distance='7' path='' />);

    expect(wrapper.find('#pathfinder__result-distance').text()).toEqual('7');
  });

  it('displays the path', () => {
    let wrapper = shallow(<Result isResult={true} distance='' path='B > C > D' />);

    expect(wrapper.find('#pathfinder__result-path').text()).toEqual('B > C > D');

    wrapper = shallow(<Result isResult={true} distance='' path='D > E > F' />);

    expect(wrapper.find('#pathfinder__result-path').text()).toEqual('D > E > F');
  })
});