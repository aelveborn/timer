import React, { Component } from 'react';

class Timer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            seconds: 1
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

        document.title = this.displayFormatedTime();
    }

    hours() {
        return Math.floor(this.state.seconds / 3600);
    }

    minutes() {
        let seconds = this.state.seconds - (this.hours() * 3600);
        if(seconds > 0) {
            return Math.floor(seconds / 60);
        }
    }

    seconds() {
        return this.state.seconds - (this.hours() * 3600) - (this.minutes() * 60);
    }

    format(digit) {
        return digit > 9 ? '' + digit: '0' + digit;
    }

    displayFormatedTime() {
        return this.format(this.hours()) + ':' + this.format(this.minutes()) + ':' + this.format(this.seconds());
    }

    render() {
        return (
            <div className="timer">
                {this.displayFormatedTime()}
            </div>
        )
    }
}

export default Timer;