import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {

  constructor() {
  }

  get(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key: string, data: Object) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Method for work with array
   * @param {string} key
   * @param {Object} data
   * @return {any}
   */
  push(key: string, data: Object): any {
    const temp = this.get(key) || [];

    if (temp.constructor === Array) {
      temp.push(data);
      this.set(key, temp);
    } else {
      console.log('The resulting object is not an array');
    }
    return temp;
  }

  /**
   * Method for work with array. Remove last el in array and return it
   * @param {string} key
   * @return {any}
   */
  pop(key: string): any {
    const temp = this.get(key) || [];

    if (temp.constructor === Array && temp.length) {
      temp.pop();
      this.set(key, temp);
    } else {
      console.log('The resulting object is not an array');
    }
    return temp;
  }

  slice(key: string, items: number): any {
    const temp = this.get(key) || [];

    if (temp.constructor === Array && temp.length) {
      temp.slice(items);
      this.set(key, temp);
    } else {
      console.log('The resulting object is not an array');
    }
    return temp;
  }

  remove(...item: string[]): void {
    item.map(name => localStorage.removeItem(name));
  }
}
