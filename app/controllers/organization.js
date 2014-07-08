import AuthenticationController from './authentication';

export default AuthenticationController.extend({
  actions: {
    createProject: function () {
      var project = this.store.createRecord('project');
      var organization = this.get('model');

      project.save().then(function () {
        organization.get('projects').then(function (projects) {
          projects.pushObject(project);
          organization.save();
        });
      });
    },

    deleteProject: function (project) {
      var organization = this.get('model');

      organization.get('projects').then(function (projects) {
        projects.removeObject(project);
        organization.save();
      });

      project.destroyRecord();
      this.transitionToRoute('projects');
    },
  }
});
