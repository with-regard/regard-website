import Ember from 'ember';

var Router = Ember.Router.extend({
  location: DashboardENV.locationType
});

Router.map(function() {
  this.route('userevents', {path: '/userevents/:organization/:product/:userevent_id'});

  this.resource('projects', {path: '/project'}, function() {
    this.resource('user-welcome');

    this.resource('project', {path: '/:project_id'}, function() {
      this.resource('investigation', {path: '/:investigation_id'}, function() {
        this.route('new');
      });
    });
  });
});

Router.reopen({
  rootURL: '/dashboard'
});

export default Router;
