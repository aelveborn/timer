import React, { Component } from 'react';
import * as Constants from '../utils/constants';

const TEXT_RESET = 'Reset timer';
const TEXT_PAUSE = 'Pause';
const TEXT_RESUME = 'Resume';

class PlayControls extends Component {

  constructor(props) {
    super(props);

    let controlText = TEXT_RESUME;
    if(props.status === Constants.STATUS_RUNNING) {
      controlText = TEXT_PAUSE;
    }

    this.state = {
      controlText
    };
  }

  handlePlayControl(event) {
    if(this.props.status === Constants.STATUS_RUNNING) {
      this.props.onPause(event);
      this.setState({controlText: TEXT_RESUME});
    } else {
      this.props.onResume(event);
      this.setState({controlText: TEXT_PAUSE});
    }
  }

  render() {
    return (
      <div className="controls">
        <a href="#reset-timer" className="defaultButton" onClick={(event) => this.props.onReset(event)}>{TEXT_RESET}</a>
        <a href="#resume-pause" className="defaultButton" onClick={(event) => this.handlePlayControl(event)}>{this.state.controlText}</a>
      </div>
    )
  }
}

export default PlayControls;