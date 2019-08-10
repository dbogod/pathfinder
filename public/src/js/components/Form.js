/* eslint-disable */
import React, { Component } from 'react';

import Errors from './Errors';
import Result from './Result';

class Form extends Component {
  // const startInput = document.querySelector('.pathfinder__form-start');
  // const finishInput = document.querySelector('.pathfinder__form-finish');
  // const form = document.querySelector('.pathfinder__form');
  // const resultContainer = document.querySelector('.pathfinder__result');
  // const resultDistance = document.querySelector('#pathfinder__result-distance');
  // const resultPath = document.querySelector('#pathfinder__result-path');
  // const errorMsgs = document.querySelectorAll('.pathfinder__error-message');
  // const errorMsgMatch = document.querySelector('.pathfinder__error-message-match');
  // const errorMsgSelect = document.querySelector('.pathfinder__error-message-select');

  // const generateProblem = (startPoint, finishPoint) => {
  //   const data = {
  //     'A': { C: 2 },
  //     'B': { D: 4, E: 7 },
  //     'C': { D: 1, F: 4 },
  //     'D': { B: 4, F: 1, G: 2 },
  //     'E': { B: 7, H: 10 },
  //     'F': { D: 1, G: 3 },
  //     'G': { H: 4 },
  //     'H': {}
  //   };
  //
  //   data.start = data[startPoint];
  //   data.finish = data[finishPoint];
  //   delete data[startPoint];
  //   delete data[finishPoint];
  //
  //   for (const [point, edgesArr] of Object.entries(data)) {
  //     for (const [key, value] of Object.entries(edgesArr)) {
  //       if (key === startPoint) {
  //       // Replace old key with 'start' key
  //         edgesArr.start = value;
  //         delete edgesArr[startPoint]
  //       } else if (key === finishPoint) {
  //       // Replace old key with 'finish' key
  //         edgesArr.finish = value;
  //         delete edgesArr[finishPoint]
  //       }
  //     }
  //
  //     if (point === 'finish') {
  //       for (const [key, value] of Object.entries(edgesArr)) {
  //         data[key].finish = value
  //       }
  //       data.finish = {};
  //     }
  //   }
  //
  //   return data;
  // };
  //
  // const lowestCostNode = (costs, processed) => {
  //   return Object.keys(costs).reduce((lowest, node) => {
  //     if (lowest === null || costs[node] < costs[lowest]) {
  //       if (!processed.includes(node)) {
  //         lowest = node;
  //       }
  //     }
  //     return lowest;
  //   }, null);
  // };
  //
  // // function that returns the minimum cost and path to reach Finish
  // const dijkstra = graph => {
  //
  //   // track lowest cost to reach each node
  //   const costs = Object.assign({ finish: Infinity }, graph.start);
  //
  //   // track paths
  //   const parents = { finish: null };
  //   for (const child in graph.start) {
  //     parents[child] = 'start';
  //   }
  //
  //   // track nodes that have already been processed
  //   const processed = [];
  //
  //   let node = lowestCostNode(costs, processed);
  //
  //   while (node) {
  //     const cost = costs[node];
  //     const children = graph[node];
  //     for (const n in children) {
  //       if (n !== 'start') {
  //         const newCost = cost + children[n];
  //         if (!costs[n]) {
  //           costs[n] = newCost;
  //           parents[n] = node;
  //         }
  //         if (costs[n] > newCost) {
  //           costs[n] = newCost;
  //           parents[n] = node;
  //         }
  //       }
  //     }
  //     processed.push(node);
  //     node = lowestCostNode(costs, processed);
  //   }
  //
  //   const optimalPath = ['finish'];
  //   let parent = parents.finish;
  //   while (parent) {
  //     optimalPath.push(parent);
  //     parent = parents[parent];
  //   }
  //   optimalPath.reverse();
  //
  //   const results = {
  //     distance: costs.finish,
  //     path: optimalPath
  //   };
  //
  //   return results;
  // };
  //
  // form.addEventListener('submit', e => {
  //   e.preventDefault();
  //
  //   resultContainer.classList.remove('pathfinder__result--show');
  //
  //   if ((!startInput.value.includes('Select') && !finishInput.value.includes('Select')) && startInput.value !== finishInput.value) {
  //
  //     const abArr = [startInput.value, finishInput.value].sort();
  //     const isFwd = startInput.value === abArr[0];
  //     const start = isFwd ? startInput.value : finishInput.value;
  //     const finish = isFwd ? finishInput.value : startInput.value;
  //     const result = dijkstra(generateProblem(start, finish));
  //
  //     [...errorMsgs].forEach(msg => msg.classList.remove('pathfinder__error-message--show'));
  //
  //     if (!isFwd) {
  //       result.path = result.path.reverse();
  //     }
  //
  //     result.path[0] = startInput.value;
  //     result.path[result.path.length - 1] = finishInput.value;
  //
  //     resultDistance.innerText = result.distance;
  //     resultPath.innerText = result.path.join(' > ');
  //     resultContainer.classList.add('pathfinder__result--show');
  //   } else if (startInput.value.includes('Select') || finishInput.value.includes('Select')) {
  //     errorMsgSelect.classList.add('pathfinder__error-message--show');
  //   } else {
  //     errorMsgMatch.classList.add('pathfinder__error-message--show');
  //   }
  // }
  //
  // form.addEventListener('reset', () => {
  //   if (resultContainer.classList.contains('pathfinder__result--show')) {
  //     resultContainer.classList.remove('pathfinder__result--show');
  //   }
  //   [...errorMsgs].forEach(msg => msg.classList.remove('pathfinder__error-message--show'));
  // });
  constructor(props) {
    super(props);
    this.state = {
      isMatchError: false,
      isSelectError: false,
      origin: '-- Select origin --',
      dest: '-- Select destination --'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = e => {
    if (e.target.classList.contains('pathfinder__form-start')) {
      this.setState({
        origin: e.target.value
      })
    } else if (e.target.classList.contains('pathfinder__form-finish')) {
      this.setState({
        dest: e.target.value
      })
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      isSelectError: false,
      isMatchError: false
    });

    if (this.state.origin === this.state.dest) {
      this.setState({
        isMatchError: true
      })
    } else if (this.state.origin.includes('Select') ||  this.state.dest.includes('Select')) {
      this.setState({
        isSelectError: true
      })
    } else {
      // Run dijkstra
    }
  };

  handleReset = () => {
    this.setState({
      isSelectError: false,
      isMatchError: false
    })
  };

  componentDidMount() {
    console.log('Form rendered');
  }

  render() {
    return (
      <div className="pathfinder__form-container">
        <form onSubmit={ this.handleSubmit } onReset={ this.handleReset } className="pathfinder__form">
          I would like to go from &nbsp;
          <select onChange={ this.handleSelect } value={ this.state.origin } className="pathfinder__form-start">
            <option>-- Select origin --</option>
            <option value="A">The Arbor</option>
            <option value="B">Braavos</option>
            <option value="C">Casterly Rock</option>
            <option value="D">Dorne</option>
            <option value="E">The Eyrie</option>
            <option value="F">The Fist of the First Men</option>
            <option value="G">The Gift</option>
            <option value="H">Harrenhal</option>
          </select>
          &nbsp;to&nbsp;
          <select onChange={ this.handleSelect } value={ this.state.dest } className="pathfinder__form-finish">
            <option>-- Select destination --</option>
            <option value="A">The Arbor</option>
            <option value="B">Braavos</option>
            <option value="C">Casterly Rock</option>
            <option value="D">Dorne</option>
            <option value="E">The Eyrie</option>
            <option value="F">The Fist of the First Men</option>
            <option value="G">The Gift</option>
            <option value="H">Harrenhal</option>
          </select>
          <div className="pathfinder__form-button-container">
            <button className="pathfinder__form-button pathfinder__form-button--submit" type="submit">Submit</button>
            <button className="pathfinder__form-button pathfinder__form-button--clear" type="reset">Clear</button>
          </div>
        </form>
        <Errors isSelectError={ this.state.isSelectError } isMatchError={ this.state.isMatchError }/>
        <Result />
      </div>
    )
  }
}

export default Form;