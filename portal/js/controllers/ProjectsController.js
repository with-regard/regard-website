App.ProjectsController = Ember.ArrayController.extend({
  needs: ['user'],
  actions: {
    createProject: function () {
      var project = this.store.createRecord('project');
      var user = this.get('controllers.user.content');

      project.save().then(function () {
        user.get('projects').then(function (projects) {
          projects.pushObject(project);
          user.save();
        });
      });
    }
  }
});