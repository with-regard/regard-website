import Ember from 'ember';

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
