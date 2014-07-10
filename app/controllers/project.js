import Ember from 'ember';
import AuthenticationController from './authentication';

export default AuthenticationController.extend({
  needs: ['organization'],

  actions: {
    deleteProject: function () {
      var project = this.get('model');
      var organization = this.get('controllers.organization.content');

      organization.get('projects').then(function (projects) {
        projects.removeObject(project);
        organization.save();
      });

      project.destroyRecord();
      this.transitionToRoute('projects');
    },
  }
});
