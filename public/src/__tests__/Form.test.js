import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Form from '../js/components/Form';

Enzyme.configure({adapter: new Adapter()});

describe('Form', () => {
  let form;
  let dropdownStart;
  let dropdownFinish;
  let submitBtn;
  let result;

  beforeEach(() => {
    form = mount(<Form/>);
    dropdownStart = form.find('.pathfinder__form-select--start');
    dropdownFinish = form.find('.pathfinder__form-select--finish');
    submitBtn = form.find('[type="submit"]');
    result = form.find('.pathfinder__result')
  });

  it('renders', () => {
    const wrapper = shallow(<Form/>);

    expect(wrapper.exists()).toBe(true);
  });

  it('the dropdowns display the selected values', () => {
    dropdownStart.simulate('click');
    dropdownStart.find('li').at(1).simulate('click');

    dropdownFinish.simulate('click');
    dropdownFinish.find('li').at(1).simulate('click');

    expect(form.state().origin).toEqual({value: 'B', name: 'Braavos'});
    expect(form.state().dest).toEqual({value: 'C', name: 'Casterly Rock'});
  });

  it('gives the correct answer', () => {
    dropdownStart.simulate('click');
    dropdownStart.find('li').at(1).simulate('click');

    dropdownFinish.simulate('click');
    dropdownFinish.find('li').at(1).simulate('click');

    expect(form.state().origin).toEqual({value: 'B', name: 'Braavos'});
    expect(form.state().dest).toEqual({value: 'C', name: 'Casterly Rock'});

    submitBtn.simulate('submit');

    expect(form.state().result).toEqual({distance: 5, path: ['B','D','C']});
    expect(form.find('#pathfinder__result-distance').text()).toEqual('5');
    expect(form.find('#pathfinder__result-path').text()).toEqual('B > D > C');
  })
});