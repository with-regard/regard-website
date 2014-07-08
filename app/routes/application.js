import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.find('user').then(function(user) {
      return user.get('firstObject');
    });
  },

  afterModel: function(user, transition) {
    if(user._data.organizations && transition.targetName === 'index') {
      var organizationId = user._data.organizations.get('firstObject.id');
      this.transitionTo('organization', organizationId);
    }
  }
});
