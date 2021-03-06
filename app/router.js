import Ember from 'ember';

var Router = Ember.Router.extend({
  location: DashboardENV.locationType
});

Router.map(function() {
  this.route('user-events', {path: '/userevents/:organization/:project/:userevent_id'});

  this.resource('organization', {path: '/:organization_id'}, function() {
    this.resource('project', {path: '/:project_id'}, function() {
      this.resource('investigation', {path: '/:investigation_id'}, function() {
        this.route('new');
      });
    });
  });

  this.resource('setup', {path: '/setup'}, function() {
    this.route('create-organization');
    this.route('install-client');
  })

  this.route('user-welcome');
});

export default Router;
