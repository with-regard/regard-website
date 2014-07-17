import AuthenticationController from './authentication';
import async from '../modules/async';

export default AuthenticationController.extend({
  actions: {
    createProject: async(function* () {
      var project = this.store.createRecord('project');
      var organization = this.get('model');

      var project = yield project.save()
      var projects = yield organization.get('projects');
      projects.pushObject(project);
      organization.save();
    }),

    deleteProject: async(function* (project) {
      var organization = this.get('model');

      var projects = yield organization.get('projects');
      projects.removeObject(project);
      organization.save();

      project.destroyRecord();
      this.transitionToRoute('projects');
    }),
  }
});
