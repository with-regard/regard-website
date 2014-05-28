App.ApplicationController = App.AuthenticationController.extend({
  actions: {
    createProject: function () {
      var project = this.store.createRecord('project');
      var user = this.get('model');

      project.save().then(function () {
        user.get('projects').then(function (projects) {
          projects.pushObject(project);
          user.save();
        });
      });
    },
    
    deleteProject: function (project) {
      var user = this.get('model');

      user.get('projects').then(function (projects) {
        projects.removeObject(project);
        user.save();
      });

      project.destroyRecord();
      this.transitionToRoute('projects');
    },
  }
});