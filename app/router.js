import Ember from 'ember';

var Router = Ember.Router.extend({
  location: DashboardENV.locationType
});

Router.map(function() {
  this.route('user-events', {path: '/userevents/:organization/:product/:userevent_id'});

  this.resource('projects', {path: '/project'}, function() {
    this.resource('user-welcome');

    this.resource('project', {path: '/:project_id'}, function() {
      this.resource('investigation', {path: '/:investigation_id'}, function() {
        this.route('new');
      });
    });
  });
});

export default Router;
