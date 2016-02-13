import run from 'ember-runloop';
import RSVP from 'rsvp';
import { animate, stop } from "liquid-fire";

export default function nullTransition({duration}) {
  this.lookup('default').call(this);
  return new RSVP.Promise(resolve => {
    run.later(resolve, duration || 500);
  });
}
