import Ember from 'ember';
import ApplicationAdapter from '../adapters/application';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('investigation', params.investigation_id);
  },

  afterModel: function(investigation, transition) {    
    if(!investigation.get('queryDefinition') || transition.targetName === 'investigation.new') {
      this.transitionTo('investigation.new');
    } else {
      var promise = new Ember.RSVP.Promise(function(resolve, reject) {
        var adapter = new ApplicationAdapter();
        $.getJSON(adapter.buildURL('chartdata', investigation.id), resolve).fail(reject);
      });

      promise.then(function(data){
        investigation.set('chartdata', data);
      });

      return promise;
    }
  }
});
