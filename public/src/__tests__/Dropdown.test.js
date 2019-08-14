import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Dropdown from '../js/components/Dropdown';

Enzyme.configure({ adapter: new Adapter() });

const options = [
  {value: 'A', displayString: 'The Arbor'},
  {value: 'B', displayString: 'Braavos'},
  {value: 'C', displayString: 'Casterly Rock'},
  {value: 'D', displayString: 'Dorne'},
  {value: 'E', displayString: 'The Eyrie'},
  {value: 'F', displayString: 'The Fist of the First Men'},
  {value: 'G', displayString: 'The Gift'},
  {value: 'H', displayString: 'Harrenhal'}
];

describe('Dropdown', () => {
  it('displays the right value based on props.value', () => {
    const dropdown = shallow(
      <Dropdown handleSelect={() => null}
                value='The Arbor'
                options={options}
                containerClasses=""
                listClasses=""
                titleClasses=""/>
                );

    expect(dropdown.find('span').text()).toBe('The Arbor');
  });

  it('calls props.handleSelect on value change', () => {
    const handleSelectSpy = jest.fn();

    const dropdown = shallow(
      <Dropdown handleSelect={handleSelectSpy}
                value='The Arbor'
                options={options}
                containerClasses=""
                listClasses=""
                titleClasses=""/>
    );

    dropdown.find('li').at(0).simulate('click');

    expect(handleSelectSpy).toHaveBeenCalled();
  });

  it('displays the selected place name ', () => {
    const handleSelectSpy = jest.fn();

    const dropdown = shallow(
      <Dropdown handleSelect={handleSelectSpy}
                value='The Arbor'
                options={options}
                containerClasses=""
                listClasses=""
                titleClasses=""/>
    );

    dropdown.find('li').at(0).simulate('click');

    expect(handleSelectSpy).toHaveBeenCalled();
  })
});