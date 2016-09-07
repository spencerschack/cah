export function initialize(application) {
  application.lookup('service:actor');
}

export default {
  name: 'init-actor',
  initialize
};
