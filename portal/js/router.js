App.Router.map(function () {
  this.resource('users', {path: '/'}, function() {
    this.resource('user', {path: '/:user_id'}, function() {
      this.resource('projects', {path: '/projects'}, function() {
        this.resource('project', {path: '/project/:project_id'}, function() {
          this.resource('investigations', function(){
            this.resource('investigation', {path: '/:investigation_id'});  
          });
        });    
      });  
    });  
  });
});

App.Router.reopen({
  rootURL: '/portal'
});

App.UsersRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('user');
  }
})

App.ProjectsRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('project');
  },
  afterModel: function(projects, transition) {
    if (projects.get('length') > 1) {
      this.transitionTo('project', projects.objectAt(0));
    }
  },
  renderTemplate: function() {
    this.render('projects', { 
      outlet: 'off-canvas' 
    });
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
    });
  }
});