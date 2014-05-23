App.AuthenticationController = Ember.ObjectController.extend({
  needs: ['application'],
  
  canEdit: function() {
    var user = this.get('controllers.application.content');
    return user.get('isDeveloper');
  }
});