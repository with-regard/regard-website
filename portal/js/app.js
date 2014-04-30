var App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  //LOG_TRANSITIONS_INTERNAL: true
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: '/api',
  namespace: 'v1'
});

App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: '_id'
});