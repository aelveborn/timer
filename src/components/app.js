import React, { Component } from 'react';
import Timer from './timer';
import TimeFormat from '../utils/timeFormat';

class App extends Component {

  constructor(props) {
    super(props);
    this.timeFormat = new TimeFormat();
    this.state = {
      seconds: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));

    document.title = this.timeFormat.displayTime(this.state.seconds);
  }

  render() {
    return (
      <div className="app">
        <Timer seconds={this.state.seconds} />
      </div>
    );
  }
}

export default App;
