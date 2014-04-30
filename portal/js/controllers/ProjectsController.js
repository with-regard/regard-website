App.ProjectsController = Ember.ArrayController.extend({
  needs: ['application'],
  actions: {
    createProject: function () {
      var project = this.store.createRecord('project');
      var user = this.get('controllers.application.content');

      project.save().then(function () {
        user.get('projects').pushObject(project);
        user.save();
      });
    }
  }
});