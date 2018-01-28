import React, { Component } from 'react';

class Timer extends Component {

  componentDidMount() {
    this.setBackground();
  }

  setBackground() {
    var downloadingImage = new Image();
    downloadingImage.onload = function () {
      document.body.style.backgroundImage = 'url(' + this.src + ')';
      document.getElementById('backgroundMask').style.transitionDuration = "2s";
      document.getElementById('backgroundMask').style.opacity = "0";
    };
    downloadingImage.src = 'https://source.unsplash.com/collection/1657989&ts=' + Date.now();
  }

  handleClick(event) {
    event.preventDefault();
    document.getElementById('backgroundMask').style.transitionDuration = "0.4s";
    document.getElementById('backgroundMask').style.opacity = "1";
    this.setBackground();
  }

  render() {
    return (
      <div>
        <div className="backgroundControls">
          <a href="#random-image" className="backgroundButton" onClick={(event) => this.handleClick(event)}>
            <i className="fa fa-picture-o" aria-hidden="true"></i>
          </a>
        </div>
        <div id="backgroundMask" className="mask"></div>
      </div>
    )
  }
}

export default Timer;