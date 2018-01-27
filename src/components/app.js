import React, { Component } from 'react';
import Timer from './timer';
import TimeFormat from '../utils/timeFormat';
import Storage from '../utils/storage';

class App extends Component {

  constructor(props) {
    super(props);
    this.storage = new Storage();
    this.timeFormat = new TimeFormat();
    this.defaultTitle = 'Hi there, whatcha doing?';

    let storedData = this.getStoredData();

    this.state = {
      title: storedData.title,
      seconds: this.currentTimestamp() - storedData.timestamp
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
    document.title = this.timeFormat.displayTime(this.state.seconds) + ' - ' + this.state.title;
  }

  getStoredData() {
    let data = this.storage.get();
    if (!data) {
      data = {
        title: this.defaultTitle,
        timestamp: this.currentTimestamp()
      }
      this.storage.set(data);
    }
    return data;
  }

  setTitle(value) {
    this.setState({
      title: value
    });

    let data = this.storage.get();
    data.title = value;
    this.storage.set(data);
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
      value = this.defaultTitle;
    }

    this.setTitle(value);
  }

  render() {
    return (
      <div className="app">
        <div className="title">
          <input type="text" 
            value={this.state.title} 
            onChange={(event) => this.handleTitleChange(event)} 
            onBlur={(event) => this.handleTitleBlur(event)} />
        </div>
        <Timer seconds={this.state.seconds} />
      </div>
    );
  }
}

export default App;