import Ember from 'ember';
import AuthenticationController from './authentication.js';

export default Ember.ObjectController.extend({
  needs: ['application'],

  canEdit: function() {
    var user = this.get('controllers.application.content');
    return user && user.get('isDeveloper');
  }.property(),

  isAnonymous: function() {
    var user = this.get('controllers.application.content');
    return user && user.get('isAnonymous');
  }.property()
});
