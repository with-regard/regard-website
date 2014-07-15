import Ember from 'ember';
import async from '../modules/async';

export default Ember.Controller.extend({
  needs: ['application'],

  init: function() {
    var login = this.get('controllers.application.content.login');
    this.set('organization', login);
    this.set('project', 'first Regard project');
  },

  nextButtonDisabled: function() {
    return !(this.get('organization') && this.get('project'));
  }.property('organization', 'project'),

  actions: {
    createOrganization: async(function* () {
      var organizationName = this.get('organization');
      var projectName = this.get('project');
      var userId = this.get('controllers.application.content.id');

      var organization = this.store.createRecord('organization', {
        name: organizationName,
        users: [userId]
      });

      var project = this.store.createRecord('project',  {
        name: projectName
      });

      var project = yield project.save()
      var projects = yield organization.get('projects')
      projects.pushObject(project);

      var organization = yield organization.save()
      this.set('organization', organization);
      this.set('project', project);
      this.transitionToRoute('setup.install-client');
    }),

    goToProject: function() {
      var organizationId = this.get('organization.id');
      this.transitionToRoute('organization', organizationId);
    }
  }
});
