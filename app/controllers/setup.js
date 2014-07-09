import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createOrganization: function() {
      var organizationName = this.get('organization');
      var productName = this.get('product');
      var userId; // get userId

      // validate organzation and product names (convert to lowercase and dasherize)

      // create organization
      var organization = this.store.createRecord('organization', {
        name: organizationName
        users: [userId];
      });

      var project = this.store.createRecord('project',  {
        name: productName
      })

      project.save().then(function() {
        organization.get('projects').then(function(projects){
          projects.pushObject(project);
        })

        organization.save().then(function() {
          this.set('organizationId', organization.get('id'));
          this.transitionToRoute('setup.install-client');
        });
      });
    },

    goToProject: function() {
      var organizationId = this.get('organizationId');
      this.transistionToRoute('organization', organizationId);
    }
  }
});
