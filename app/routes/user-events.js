import Ember from 'ember';
import UserDataAdapter from '../adapters/user-data';

export default Ember.Route.extend({
  model: function(params) {
    var adapter = UserDataAdapter.create();
    return adapter.find(params.organization, params.project, params.userevent_id).then(function(data) {
      return Ember.Object.create(data)
    });
  }
});
