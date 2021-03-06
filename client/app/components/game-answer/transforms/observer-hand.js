import computed from 'ember-computed-decorators';
import Transform from './base';
import Hand from './hand';
import Submission from './submission';

export default Transform.extend(
  Hand,
  Submission);
