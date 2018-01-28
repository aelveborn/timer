import React, { Component } from 'react';
import Timer from './timer';
import TimeFormat from '../utils/timeFormat';
import Storage from '../utils/storage';
import Background from './background';
import PlayControls from './playControls';
import * as Constants from '../utils/constants';

const defaultTitle = 'Give your timer a name';

class App extends Component {

  constructor(props) {
    super(props);
    this.storage = new Storage();
    this.timeFormat = new TimeFormat();

    this.initStorage();

    let storedData = this.storage.get();
    let display = storedData.history;
    if(storedData.status === Constants.STATUS_RUNNING) {
      display += this.currentTimestamp() - storedData.timestamp;
    }

    this.state = {
      title: storedData.title,
      displaySeconds: display,
      timer: {
        startedTimestamp: storedData.timestamp,
        historyInSeconds: storedData.history,
        status: storedData.status
      }
    };
  }

  componentDidMount() {
    if(this.state.timer.status === Constants.STATUS_RUNNING) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    // Should not pause or save state, only clear interval
    this.stopTimer();
  }

  initStorage() {
    let data = this.storage.get();
    if (!data) {
      data = {
        title: defaultTitle,
        timestamp: this.currentTimestamp(), // Started timestamp in seconds
        history: 0,                         // History in seconds
        status: Constants.STATUS_RUNNING    // STATUS_RUNNING / STATUS_PAUSED
      }
      this.storage.set(data);
    }
  }

  startTimer() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  resume() {
    let storedData = this.storage.get();
    storedData.timestamp = this.currentTimestamp();
    storedData.status = Constants.STATUS_RUNNING;
    this.storage.set(storedData);

    this.setState({
      timer: {
        startedTimestamp: storedData.timestamp,
        historyInSeconds: storedData.history,
        status: storedData.status
      }
    });
    
    this.startTimer();
  }

  pause() {
    this.stopTimer();
    this.updateDisplay();

    let storedData = this.storage.get();
    storedData.history += this.currentTimestamp() - storedData.timestamp;
    storedData.status = Constants.STATUS_PAUSED;
    this.storage.set(storedData);

    this.setState({
      timer: {
        status: storedData.status
      }
    });
  }

  reset() {
    let storedData = this.storage.get();
    storedData.timestamp = this.currentTimestamp();
    storedData.history = 0;
    storedData.status = Constants.STATUS_RUNNING;
    this.storage.set(storedData);

    if(this.state.timer.status === Constants.STATUS_PAUSED) {
      this.startTimer();
    }
    
    this.setState({
      displaySeconds: 0,
      timer: {
        startedTimestamp: storedData.timestamp,
        historyInSeconds: storedData.history,
        status: storedData.status
      }
    });
  }

  updateDisplay() {
    this.setState(prevState => ({
      displaySeconds: prevState.timer.historyInSeconds + (this.currentTimestamp() - prevState.timer.startedTimestamp)
    }));
    document.title = this.timeFormat.displayTime(this.state.displaySeconds) + ' – ' + this.state.title;
  }

  tick() {
    this.updateDisplay();
  }

  setTitle(value) {
    this.setState({
      title: value
    });

    let storedData = this.storage.get();
    storedData.title = value;
    this.storage.set(storedData);
  }

  currentTimestamp() {
    return Math.floor(Date.now() / 1000);
  }

  handleTitleChange(event) {
    let value = event.target.value;
    this.setTitle(value);
  }

  handleTitleBlur(event) {
    let value = event.target.value;
    if(value === '') {
      value = defaultTitle;
    }
    this.setTitle(value);
  }

  handleTitleFocus(event) {
    let value = event.target.value;
    if(value === defaultTitle) {
      this.setTitle('');
    }
  }

  handleReset(event) {
    this.reset();
    event.preventDefault();
  }

  handleResume(event) {
    this.resume();
    event.preventDefault();
  }

  handlePause(event) {
    this.pause();
    event.preventDefault();
  }

  render() {
    return (
      <div className="app">
        <div className="content">

          <div className="title">
            <input type="text" 
              value={this.state.title} 
              onChange={(event) => this.handleTitleChange(event)} 
              onBlur={(event) => this.handleTitleBlur(event)}
              onFocus={(event) => this.handleTitleFocus(event)} />
          </div>

          <Timer seconds={this.state.displaySeconds} />
          <PlayControls status={this.state.timer.status}
            onReset={(event) => this.handleReset(event)}
            onResume={(event) => this.handleResume(event)}
            onPause={(event) => this.handlePause(event)} />

        </div>
        <Background />
      </div>
    );
  }
}

export default App;