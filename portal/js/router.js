App.Router.map(function () {
  this.resource('projects', {path: '/'}, function(){
    this.resource('project', {path: '/project/:project_id'}, function(){
      this.resource('investigation', {path: '/:investigation_id'});  
    });
  });
});

App.ProjectsRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('project');
  }
});

App.ProjectRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('project', params.project_id);    
  },
  renderTemplate: function() {
    this.render('investigations', { 
      outlet: 'main' 
    });
    
    this.render({
      outlet: 'title'
    })
  }
});
