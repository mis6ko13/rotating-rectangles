import {Injectable} from '@angular/core';

@Injectable()
export class HelperService {

  constructor() {
  }

  getRandomArbitrary(min, max) {
    return (Math.random() * (max - min) + min).toFixed(0);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  clearField(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }
}
