import Ember from 'ember';
import UserDataAdapter from '../adapters/user-data';
import async from '../modules/async';

export default Ember.Route.extend({
  model: async(function* (params) {
    var adapter = UserDataAdapter.create();
    var data = yield adapter.find(params.organization, params.project, params.userevent_id);
    return Ember.Object.create(data);
  })
});
