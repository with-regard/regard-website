App.ProjectsController = Ember.ArrayController.extend({
  actions: {
    createProject: function () {
      var project = this.store.createRecord('project', {
        name: 'New project'
      });

      project.save();
    }
  }
});