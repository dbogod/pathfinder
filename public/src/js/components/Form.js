/*eslint-disable*/
import React, { Component } from 'react';

import Dropdown from './Dropdown';
import ArrowsIcon from '../icons/Arrows';
import Errors from './Errors';
import Result from './Result';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectError: false,
      isResult: false,
      origin: {
        value: '',
        name: 'From:'
      },
      dest: {
        value: '',
        name: 'To:',
      },
      result: {
        distance: '',
        path: ''
      },
      locations: [
        { value: 'A', displayString: 'The Arbor' },
        { value: 'B', displayString: 'Braavos' },
        { value: 'C', displayString: 'Casterly Rock' },
        { value: 'D', displayString: 'Dorne' },
        { value: 'E', displayString: 'The Eyrie' },
        { value: 'F', displayString: 'The Fist of the First Men' },
        { value: 'G', displayString: 'The Gift' },
        { value: 'H', displayString: 'Harrenhal' }
      ]
    };

    this.findPath = this.findPath.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  findPath = (startPoint, finishPoint) => {
    const isFwd = startPoint === [startPoint, finishPoint].sort()[0];
    const origin = isFwd ? startPoint : finishPoint;
    const dest = isFwd ? finishPoint : startPoint;

    const graph = (() => {

      const data = {
        'A': { C: 2 },
        'B': { D: 4, E: 7 },
        'C': { D: 1, F: 4 },
        'D': { B: 4, F: 1, G: 2 },
        'E': { B: 7, H: 10 },
        'F': { D: 1, G: 3 },
        'G': { H: 4 },
        'H': {}
      };

      data.start = data[origin];
      data.finish = data[dest];
      delete data[origin];
      delete data[dest];

      for (const [point, edgesArr] of Object.entries(data)) {
        for (const [key, value] of Object.entries(edgesArr)) {
          if (key === origin) {
            // Replace old key with 'start' key
            edgesArr.start = value;
            delete edgesArr[origin]
          } else if (key === dest) {
            // Replace old key with 'finish' key
            edgesArr.finish = value;
            delete edgesArr[dest]
          }
        }

        if (point === 'finish') {
          for (const [key, value] of Object.entries(edgesArr)) {
            data[key].finish = value
          }
          data.finish = {};
        }
      }

      return data;
    })();

    // Return nearest point
    const nearestPoint = (shortestDistances, processed) => {
      return Object.keys(shortestDistances).reduce((nearest, point) => {
        if (nearest === null || shortestDistances[point] < shortestDistances[nearest]) {
          // Ignore if point has already been processed
          if (!processed.includes(point)) {
            nearest = point;
          }
        }
        return nearest;
      }, null);
    };

    // Object to keep track of the shortest distance to reach each point from 'start'
    const shortestDistance = Object.assign({ finish: Infinity }, graph.start);

    // Object to keep track of nearest parent to each point
    const parents = { finish: null };
    for (const child in graph.start) {
      parents[child] = 'start';
    }

    // Array of points which have been processed
    const processed = [];

    let point = nearestPoint(shortestDistance, processed);

    // Loop through the points
    while (point) {
      const distance = shortestDistance[point];
      const children = graph[point];
      for (const child in children) {
        if (child !== 'start') {
          const newDistance = distance + children[child];
          if (!shortestDistance[child] || shortestDistance[child] > newDistance) {
            shortestDistance[child] = newDistance;
            parents[child] = point;
          }
        }
      }
      processed.push(point);
      point = nearestPoint(shortestDistance, processed);
    }

    // Build shortest path array by going backwards through shortest path and adding each parent to the array until there parent is null (ie. 'start')
    const shortestPath = ['finish'];
    let parent = parents.finish;
    while (parent) {
      shortestPath.unshift(parent);
      parent = parents[parent];
    }

    // Reverse path array if values were not in alphabetical order
    if (!isFwd) {
      shortestPath.reverse();
    }

    // Object containing distance (num) and shortest path (array)
    const result = {
      distance: shortestDistance.finish,
      path: shortestPath
    };

    result.path[0] = isFwd ? origin : dest;
    result.path[result.path.length - 1] = isFwd ? dest : origin;

    this.setState({
      result: result
    });
  };

  handleReset = () => {
    this.setState({
      isSelectError: false,
      isResult: false,
      origin: {
        value: '',
        name: 'From:'
      },
      dest: {
        value: '',
        name: 'To:'
      },
      result: {
        distance: '',
        path: ''
      }
    })
  };

  handleSelect = e => {
    e.stopPropagation();
    e.target.closest('div').classList.remove('open');

    if (e.target.closest('div').classList.contains('pathfinder__form-select--start')) {
      this.setState({
        origin: { value: e.target.dataset.value, name: e.target.dataset.name }
      });
    } else if (e.target.closest('div').classList.contains('pathfinder__form-select--finish')) {
      this.setState({
        dest: { value: e.target.dataset.value, name: e.target.dataset.name }
      })
    }

    setTimeout(() => {
      if (this.state.origin.value !== '' && this.state.dest.value !== '') {
        this.setState({
          isSelectError: false
        })
      }
    }, 100);
  };

  handleSubmit = e => {
    e.preventDefault();
    const origin = this.state.origin.value;
    const dest = this.state.dest.value;

    this.setState({
      isSelectError: false,
      isResult: false,
      result: {
        distance: '',
        path: ''
      }
    });

    if (origin === '' || dest === '') {
      this.setState({
        isSelectError: true
      })
    } else {
      this.findPath(origin, dest);
      this.setState({
        isResult: true
      })
    }
  };

  handleSwitch = e => {
    e.preventDefault();

    const origin = this.state.dest;
    const dest = this.state.origin;

    if (this.state.origin.value !== '' && this.state.dest.value !== '') {
      this.setState({
        origin: origin,
        dest: dest
      })
    }
  };

  componentDidMount() {
    setTimeout(() => {
      document.querySelector('.pathfinder__form-options').classList.remove('hide');
    }, 100);

    setTimeout(() => {
      document.querySelector('.pathfinder__form-button-container').classList.remove('hide');
    }, 500);
  }

  render() {
    const distance = this.state.result.distance > 0 ? this.state.result.distance.toString() : '';
    const path = this.state.result.path.length ? this.state.result.path.join(' > ') : '';

    return (
      <div className="pathfinder__form-container">
        <form onSubmit={this.handleSubmit} onReset={this.handleReset} className="pathfinder__form">
          Plan your epic journey
          <div className="pathfinder__form-options fade hide">
            <div className="pathfinder__form-options-selects">

              <Dropdown handleSelect={this.handleSelect} value={this.state.origin.name}
                options={this.state.locations.filter(location => {
                  return location.value !== this.state.dest.value;
                })}
                containerClasses="pathfinder__form-select pathfinder__form-select--start" listClasses="pathfinder__form-select-list" titleClasses="pathfinder__form-select-title"/>
              <Dropdown handleSelect={this.handleSelect} value={this.state.dest.name}
                options={this.state.locations.filter(location => {
                  return location.value !== this.state.origin.value;
                })}
                containerClasses="pathfinder__form-select pathfinder__form-select--finish" listClasses="pathfinder__form-select-list" titleClasses="pathfinder__form-select-title"/>

            </div>
            <div className="pathfinder__form-options-switch-container">
              <button onClick={this.handleSwitch} className="pathfinder__form-button pathfinder__form-button--switch">
                <ArrowsIcon />
              </button>
            </div>
          </div>
          <div className="pathfinder__form-button-container fade hide">
            <button className="pathfinder__form-button pathfinder__form-button--submit" data-component="submitBtn" type="submit">Submit</button>
            <button className="pathfinder__form-button pathfinder__form-button--clear" type="reset">Reset</button>
          </div>
        </form>
        <Errors isSelectError={this.state.isSelectError} />
        <Result isResult={this.state.isResult} distance={distance} path={path}/>
      </div>
    )
  }
}

export default Form;