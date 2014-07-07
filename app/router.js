import Ember from 'ember';

var Router = Ember.Router.extend({
  location: DashboardENV.locationType
});

Router.map(function() {
  this.route('userevents', {path: '/userevents/:organization/:product/:userevent_id'});
  this.route('user-welcome');

  this.resource('organization', {path: '/:organization_id'}, function() {
    this.resource('project', {path: '/:project_id'}, function() {
      this.resource('investigation', {path: '/:investigation_id'}, function() {
        this.route('new');
      });
    });
  });
});

export default Router;
