import React, { Component } from 'react';

class Title extends Component {

  handleKeyPress(event) {
    if(event.key === 'Enter') {
      this.refs['title'].blur()
    }
  }

  render() {
    return (
      <div className="title">
        <input type="text" 
          ref='title'
          value={this.props.title} 
          onChange={(event) => this.props.onChange(event)} 
          onBlur={(event) => this.props.onBlur(event)}
          onFocus={(event) => this.props.onFocus(event)}
          onKeyPress={(event) => this.handleKeyPress(event)} />
      </div>
    )
  }
}

export default Title;