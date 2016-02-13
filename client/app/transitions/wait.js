import run from 'ember-runloop';
import RSVP from 'rsvp';
import { animate, stop } from "liquid-fire";

export default function wait(duration, thenName='default', thenOptions={}) {
  return new RSVP.Promise(resolve => {
    run.later(() => {
      resolve(this.lookup(thenName).call(this, thenOptions));
    }, duration || 500);
  });
}
