class TimeFormat {
  
  hours(seconds) {
    return Math.floor(seconds / 3600);
  }

  minutes(seconds) {
    let remaining = seconds - (this.hours(seconds) * 3600);
    if (remaining > 0) {
      return Math.floor(remaining / 60);
    } else {
      return 0;
    }
  }

  seconds(seconds) {
    return seconds - (this.hours(seconds) * 3600) - (this.minutes(seconds) * 60);
  }

  numberFormat(digit) {
    return digit > 9 ? '' + digit : '0' + digit;
  }

  displayTime(seconds) {
    return this.numberFormat(this.hours(seconds)) + ':' + this.numberFormat(this.minutes(seconds)) + ':' + this.numberFormat(this.seconds(seconds));
  }
}

export default TimeFormat;