var App = Ember.Application.create();

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: '/api',
  namespace: 'v1'
});

App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: '_id'
});

App.ApplicationController = Ember.Controller.extend({
  init: function () {
    $.get("portal/user", function (user) {
      Ember.set('App.User', user);
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