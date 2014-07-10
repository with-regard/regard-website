import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('project', params.project_id);
  },

  afterModel: function(project, transition) {
    if(transition.targetName === 'project.index') {
      var self = this;

      project.get('investigations').then(function(investigations){
        if(investigations.get('firstObject')) {
          self.transitionTo('investigation', investigations.get('firstObject'));
        }
      });
    }
  },

  renderTemplate: function() {
    this.render('project');
    this.render('project-title', {
      outlet: 'title'
    });
  },
});
