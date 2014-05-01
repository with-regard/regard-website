App.Router.map(function () {
  this.resource('projects', {path: '/'}, function() {
    this.resource('project', {path: 'projects/:project_id'}, function() {
      this.resource('investigations', {path: '/investigations'}, function() {
        this.resource('investigation', {path: '/:investigation_id'});  
      });
    });
  });
});

App.Router.reopen({
  rootURL: '/portal'
});

App.ApplicationRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('user').then(function(result){
      return result.get('firstObject');
    });
  },
  afterModel: function(user, transition) {
    user.get('projects');
    this.transitionTo('projects');
  }
})

App.ProjectsRoute = Ember.Route.extend({
  model: function () {
    return this.store.all('project');
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
  afterModel: function(project, transition) {
    project.get('investigations');
  },
  renderTemplate: function() {
    this.render('investigations', {
      outlet: 'main'
    });
    this.render('project-title', {
      outlet: 'title'
    });
  }
});