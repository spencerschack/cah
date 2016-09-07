import Helper from 'ember-helper';
import {htmlSafe} from 'ember-string';

export function breakNewlines([text]) {
  return htmlSafe(text.replace(/\n/, '<br>'));
}

export default Helper.helper(breakNewlines);
