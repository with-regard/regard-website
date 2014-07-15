import Ember from 'ember';
import AuthenticationController from './authentication';
import async from '../modules/async';

export default AuthenticationController.extend({
  needs: ['organization'],

  actions: {
    deleteProject: async(function* () {
      var project = this.get('model');
      var organization = this.get('controllers.organization.content');

      var projects = yield organization.get('projects');
      projects.removeObject(project);
      organization.save();

      project.destroyRecord();
      this.transitionToRoute('projects');
    }),
  }
});
