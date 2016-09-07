import get from 'ember-metal/get';

export function range(begin = 0, end) {
  if(begin > end)
    return range(end, begin).reverse();
  return new Array(end - begin).fill(0).map((_, index) => index + begin);
}

export function rotate(n) {
  return this.slice(n).concat(this.slice(0, n));
}

export function rotateTo(element) {
  return this::rotate(this.indexOf(element));
}

export function flatten() {
  return this.reduce([], (array, element) => array.concat(element));
}

export function flatMap(fn) {
  return this.map(fn)::flatten();
}

export function flatMapBy(key) {
  return this::flatMap(element => get(element, key));
}
