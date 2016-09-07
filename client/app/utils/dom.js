export function on(event, handler) {
  return this.addEventListener(event, handler);
}

export function off(event, handler) {
  return this.removeEventListener(event, handler);
}
