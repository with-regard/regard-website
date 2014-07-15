import Ember from 'ember';
import async from '../modules/async';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('organization', params.organization_id);
  },

  afterModel: async(function* (organization, transition) {
    if (transition.targetName === 'organization.index') {
      var projects = yield organization.get('projects');
      this.transitionTo('project', projects.get('firstObject'));
    }
  })
});
