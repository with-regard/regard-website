App.Router.map(function () {
  this.resource('projects', {path: '/'}, function() {
    this.resource('project', {path: '/:project_id'}, function() {
      this.resource('investigations', {path: '/investigations'});
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
  }
});

App.ProjectRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('project', params.project_id);    
  },
  renderTemplate: function() {
    this.render('project');
    this.render('project-title', {
      outlet: 'title'
    });
  }
});