import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],

  actions: {
    createOrganization: function() {
      var self = this;

      var organizationName = this.get('organization');
      var projectName = this.get('project');
      var userId = this.get('controllers.application.content.id');

      var organization = this.store.createRecord('organization', {
        name: organizationName,
        users: [userId]
      });

      var project = this.store.createRecord('project',  {
        name: projectName
      })

      project.save().then(function() {
        organization.get('projects').then(function(projects){
          projects.pushObject(project);

          organization.save().then(function() {
            self.set('organization', organization);
            self.set('project', project);
            self.transitionToRoute('setup.install-client');
          });
        });
      });
    },

    goToProject: function() {
      var organizationId = this.get('organization.id');
      this.transistionToRoute('organization', organizationId);
    }
  }
});
