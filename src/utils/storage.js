class Storage {

  constructor() {
    this.storageName = 'timer';
  }
    
  set(object) {
    localStorage.setItem(this.storageName, JSON.stringify(object));
  }

  get() {
    return JSON.parse(localStorage.getItem(this.storageName));
  }

}

export default Storage;