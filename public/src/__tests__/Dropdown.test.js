import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Dropdown from '../js/components/Dropdown';

Enzyme.configure({ adapter: new Adapter() });

describe('Dropdown', () => {
  it('displays the right value based on props.value', () => {
    let dropdown = shallow(
      <Dropdown handleSelect={() => null}
                value='The Arbor'
                options={[]}
                containerClasses=""
                listClasses=""
                titleClasses=""/>
                );

    expect(dropdown.find('span').text()).toBe('The Arbor');

    dropdown = shallow(
      <Dropdown handleSelect={() => null}
                value='Dorne'
                options={[]}
                containerClasses=""
                listClasses=""
                titleClasses=""/>
                );

    expect(dropdown.find('span').text()).toBe('Dorne');
  });

  it('calls props.handleSelect on value change', () => {
    const handleSelectSpy = jest.fn();

    const dropdown = shallow(
      <Dropdown handleSelect={handleSelectSpy}
                value=''
                options={[{ value: 'E', displayString: 'The Eyrie' }]}
                containerClasses=""
                listClasses=""
                titleClasses=""/>
    );

    const firstListItem = dropdown.find('li').at(0)

    firstListItem.simulate('click');

    expect(handleSelectSpy).toHaveBeenCalled();
    expect(firstListItem.text()).toEqual('The Eyrie');
  });

  it('has classes based on props', () => {
    const handleSelectSpy = jest.fn();

    const dropdown = shallow(
      <Dropdown handleSelect={handleSelectSpy}
                value=''
                options={[{ value: 'E', displayString: 'The Eyrie' }]}
                containerClasses="pathfinder__form-select pathfinder__form-select--finish"
                listClasses="pathfinder__form-select-list"
                titleClasses="pathfinder__form-select-title" />
    );

    const div = dropdown.find('div').at(0);
    const ul = dropdown.find('ul').at(0);
    const span = dropdown.find('span').at(0);

    expect(div.hasClass('pathfinder__form-select--finish')).toBe(true);
    expect(div.hasClass('pathfinder__form-select--start')).toBe(false);
    expect(ul.hasClass('pathfinder__form-select-list')).toBe(true);
    expect(span.hasClass('pathfinder__form-select-title')).toBe(true);
  });
});