import { animate, stop } from "liquid-fire";

export default function swap(options={}) {
  options.duration = options.duration || 500;
  stop(this.oldElement);
  const oldHeight = this.oldElement.height();
  const newHeight = this.newElement.height();
  return Promise.all([
    animate(this.oldElement, {translateY: oldHeight}, options),
    animate(this.newElement, {translateY: 0}, options)
  ]);
}
