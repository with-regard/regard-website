import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {

    // Create an adapter that overrides find or buildUrl.
    return this.store.find('user-event', [params.organization, params.project, params.userevent_id].join('/')).then(function(model){
      model.set('organization', params.organization);
      model.set('project', params.project);

      return model;
    });
  }
});
