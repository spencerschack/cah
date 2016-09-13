import Mixin from 'ember-metal/mixin';
import Bindings from './bindings';

export default Mixin.create(
  Bindings('style', {prefix: ':', separator: ';', dasherize: true, htmlSafe: true}),
{

  attributeBindings: ['style']

});
