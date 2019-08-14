/*eslint-disable*/
import React, { Component } from 'react';

import Form from './components/Form';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      kb: false
    };

    this.focusStyle = this.focusStyle.bind(this);
  }

  focusStyle = (e) => {
    if (e.key) {
      if (e.key === 'Tab' || e.shiftKey) {
        this.setState({
          kb: true
        })
      }
    } else {
      this.setState({
        kb: false
      })
    }
  };

  render() {

    return (
      <div className={`outer-wrapper ${this.state.kb ? 'kb-focus' : ''}`} onKeyUp={this.focusStyle} onClick={this.focusStyle}>
        <header>
          <h1 className="pathfinder__title">Pathfinder</h1>
        </header>
        <main>
          <Form/>
        </main>
      </div>
    )
  }
}

export default App;