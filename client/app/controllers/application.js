import Controller from 'ember-controller';
import {alias} from 'ember-decorators/object/computed';
import {service} from 'ember-decorators/service';

export default class ApplicationController extends Controller {

  @service session

  @alias('session.player') currentPlayer

};
