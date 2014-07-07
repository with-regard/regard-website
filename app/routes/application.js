import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.find('user').then(function(user) {
      return user.get('firstObject');
    });
  },

  afterModel: function(user) {
    this.transitionTo('organization', '53b43c81e4b038f8db091e75');
  }
});
