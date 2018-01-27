import Storage from '../utils/storage';

describe('Storage', () => {
  let storage;
  let data = {
      title: 'Hello World'
  }

  beforeEach(() => {
    storage = new Storage();
  });

  it('should be initialized', () => {
    expect(storage).toBeDefined();
  });

  it('should store and retrieve an object', () => {
      storage.set(data);
      expect(storage.get().title).toBe(data.title);
  });

});