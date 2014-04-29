App.InvestigationsController = Ember.ArrayController.extend({
  needs: ['project'],
  
  actions: {
    createInvestigation: function () {
      var investigation = this.store.createRecord('investigation');
      
      var project = this.get('controllers.project.content');
      
      investigation.save().then(function(){
        project.get('investigations').addObject(investigation);
        
        project.save();
      });
    }
  }
});