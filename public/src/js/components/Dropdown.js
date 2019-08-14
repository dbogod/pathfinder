import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChevronIcon from '../icons/Chevron';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.kbActions = this.kbActions.bind(this);
    this.menuState = this.menuState.bind(this);
  }

  toggleMenu = e => {
    e.stopPropagation();

    if (e.target.classList.contains('open')) {
      e.target.classList.remove('open');

      this.menuState(false);
    } else {
      [...document.querySelectorAll('.open')].forEach(openMenu => {
        openMenu.classList.remove('open');
      });

      e.target.classList.add('open');

      this.menuState(true);
    }
  };

  kbActions = e => {
    if (e.target.tagName === 'DIV') {
      if (e.key === 'Enter') {
        this.toggleMenu(e);
      } else if (e.key === 'ArrowDown') {
        if (e.target.querySelector('ul').firstChild) {
          e.target.querySelector('ul').firstChild.focus();
        }
      }
    } else if (e.target.tagName === 'LI') {
      if (e.key === 'Enter') {
        this.props.handleSelect(e);
        this.menuState(false);
      } else if (e.key === 'ArrowDown') {
        if (e.target.nextElementSibling) {
          e.target.nextElementSibling.focus();
        } else {
          e.target.parentNode.firstChild.focus();
        }
      } else if (e.key === 'ArrowUp') {
        if (e.target.previousElementSibling) {
          e.target.previousElementSibling.focus()
        } else {
          e.target.parentNode.lastChild.focus();
        }
      }
    }

    if (e.key === 'Escape') {
      e.target.closest('div').classList.remove('open');
      this.menuState(false);
    }
  };

  menuState = bool => {
    this.setState({
      menuIsOpen: bool
    })
  };

  componentDidMount() {
    window.addEventListener('click', () => {
      [...document.querySelectorAll('.open')].forEach(menu => {
        menu.classList.remove('open');
      });
    });
  }

  render() {
    const options = this.props.options;
    const menuOptions = options.length ? (
      options.map((option, i) => {
        return (
          <li data-value={option.value} data-name={option.displayString} key={i} onClick={e => {this.props.handleSelect(e); this.menuState(false)}}  tabIndex={this.state.menuIsOpen ? '0' : ''}>{option.displayString}</li>
        )
      })
    ) : null;

    return (
      <div onClick={this.toggleMenu} onKeyUp={this.kbActions} className={this.props.containerClasses} tabIndex="0">
        <span className={this.props.titleClasses}>{this.props.value}</span>
        <ChevronIcon toggleMenu={this.toggleMenu} />
        <ul className={this.props.listClasses}>
          {menuOptions}
        </ul>
      </div>
    )
  }
}

Dropdown.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  containerClasses: PropTypes.string.isRequired,
  titleClasses: PropTypes.string.isRequired,
  listClasses: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
};

export default Dropdown;