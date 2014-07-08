import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('organization', params.organization_id);
  },

  afterModel: function(organization, transition) {
    if(transition.targetName === 'organization.index') {
      var self = this;

      organization.get('projects').then(function(projects){
        self.transitionTo('project', projects.get('firstObject'));
      });
    }
  }
});
