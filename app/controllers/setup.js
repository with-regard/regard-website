import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createOrganization: function() {
      var organization = this.get('organization');
      var product = this.get('product');

      // validate organzation and product names (convert to lowercase and dasherize)
      // create organization
      // create project and add it to organization
      // store organization id and product id

      this.transitionToRoute('setup.install-client');
    },

    goToProject: function() {
      var organizationId; // = this.get('organizationId');
      this.transistionToRoute('organization', organizationId);
    }
  }
});
