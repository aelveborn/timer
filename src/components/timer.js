import React, { Component } from 'react';
import TimeFormat from '../utils/timeFormat';

class Timer extends Component {

  constructor(props) {
    super(props);
    this.timeFormat = new TimeFormat();
  }

  render() {
    return (
      <div className="timer">
        {this.timeFormat.displayTime(this.props.seconds)}
      </div>
    )
  }
}

export default Timer;