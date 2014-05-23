App.Router.map(function () {
  this.resource('projects', {path: '/'}, function() {
    this.resource('user-welcome');
    this.resource('project', {path: '/:project_id'}, function() {
      this.resource('investigation', {path: '/:investigation_id'}, function() {
        this.resource('chart', {path: '/:chart_id'});
      });
    });
  });

});

App.Router.reopen({
  rootURL: '/portal'
});

App.ApplicationRoute = Ember.Route.extend({
  model: function () {
    var self = this;
    
    return this.store.find('user').then(function(result){
      return result.get('firstObject');
    }, function(error){
      self.render('user/error');
      throw new Error('failed to get user');
    });
  },
  afterModel: function(user, transition) {
    if (!user.get('isDeveloper')) {
      console.log("transitioning");
      this.transitionTo('user-welcome');
    }
  }
})

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