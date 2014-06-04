App.ProjectController = App.AuthenticationController.extend({
  needs: ['application'],
  isEditing: false,

  // We use the bufferedName to store the original value of
  // the model's title so that we can roll it back later in the
  // `cancelEditing` action.
  bufferedName: Ember.computed.oneWay('name'),

  actions: {
    createInvestigation: function () {
      var self = this;
      
      var investigation = this.store.createRecord('investigation');
      var project = this.get('model');
      
      investigation.save().then(function(){
        self.transitionToRoute('investigation', investigation);
        
        project.get('investigations').then(function(investigations){
          investigations.pushObject(investigation);
          project.save();
        });
      });
    },
    
    
    
    editProjectName: function () {
      this.set('isEditing', true);
    },

    doneEditing: function () {
      var bufferedName = this.get('bufferedName').trim();

      if (Ember.isEmpty(bufferedName)) {
        // The `doneEditing` action gets sent twice when the user hits
        // enter (once via 'insert-newline' and once via 'focus-out').
        //
        // We debounce our call to 'removeTodo' so that it only gets
        // made once.
        Ember.run.debounce(this, 'deleteProject', 0);
      } else {
        var project = this.get('model');
        project.set('name', bufferedName);
        project.save();
      }

      // Re-set our newly edited name to persist its trimmed version
      this.set('bufferedName', bufferedName);
      this.set('isEditing', false);
    },

    cancelEditing: function () {
      this.set('bufferedName', this.get('name'));
      this.set('isEditing', false);
    },

    deleteProject: function () {
      this.deleteProject();
    },
  },

  deleteProject: function () {
    var project = this.get('model');
    var user = this.get('controllers.application.content');

    user.get('projects').then(function (projects) {
      projects.removeObject(project);
      user.save();
    });

    project.destroyRecord();
    this.transitionToRoute('projects');
  },
});