import TimeFormat from '../utils/timeFormat';

describe('TimeFormat', () => {
  let timeFormat;

  beforeEach(() => {
    timeFormat = new TimeFormat();
  });

  it('should be initialized', () => {
    expect(timeFormat).not.toBeUndefined();
  });

  it('should return 0 hours', () => {
    let seconds = 3599;
    expect(timeFormat.hours(seconds)).toEqual(0);
  });

  it('should return 1 hour', () => {
    let seconds = 3600;
    expect(timeFormat.hours(seconds)).toEqual(1);
  });

  if('should return 0 minutes', () => {
    let seconds = 59;
    expect(timeFormat.minutes(seconds)).toEqual(0);
  });

  if('should return 1 minutes', () => {
    let seconds = 60;
    expect(timeFormat.minutes(seconds)).toEqual(1);
  });

  it('should return 1 second', () => {
    let seconds = 3661;
    expect(timeFormat.seconds(seconds)).toEqual(1);
  });

  it('should display 00:00:00', () => {
    let seconds = 0;
    expect(timeFormat.displayTime(seconds)).toEqual('00:00:00');
  });

  it('should display 01:01:01', () => {
    let seconds = 3661;
    expect(timeFormat.displayTime(seconds)).toEqual('01:01:01');
  });

  it('should display 10:10:10', () => {
    let seconds = 36610;
    expect(timeFormat.displayTime(seconds)).toEqual('10:10:10');
  });

});