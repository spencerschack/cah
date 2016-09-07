import Service from 'ember-service';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import {on} from 'ember-computed-decorators';
import {storageFor} from 'ember-local-storage';

export default Service.extend({

  storage: storageFor('actor'),

  @on('init')
  setupWindows() {
    const master = get(this, 'storage.master');
    if(!master) {
      set(this, 'storage.master', true);
      window.addEventListener('unload',
        () => set(this, 'storage.master', null));
    }
  }

});
