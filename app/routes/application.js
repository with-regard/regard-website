import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.find('user').then(function(user) {
      return user.get('firstObject');
    });
  }
});
