var App = Ember.Application.create({
  LOG_TRANSITIONS: true, 

  // Extremely detailed logging, highlighting every internal
  // step made while transitioning into a route, including
  // `beforeModel`, `model`, and `afterModel` hooks, and
  // information about redirects and aborted transitions
  LOG_TRANSITIONS_INTERNAL: true
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: '/api',
  namespace: 'v1'
});

App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: '_id'
});

App.ApplicationController = Ember.Controller.extend({
  user: null,
  init: function () {
    self = this;
    $.get("portal/user", function (user) {
      self.set('user', user);
    });
  }
});

App.ProjectSerializer = DS.RESTSerializer.extend(DS.NestedRecordsMixin, {
  primaryKey: '_id',
  attrs: {
    investigations: {
      embedded: 'always'
    }
  }
});