App.Router.map(function () {
  this.resource('projects', {path: '/'}, function() {
    this.resource('user-welcome');
    this.resource('project', {path: '/:project_id'}, function() {
      this.resource('investigation', {path: '/:investigation_id'}, function() {
        this.resource('chart', {path: '/:chart_id'}, function() {
          this.route('edit');
        });
      });
    });
  });

});

App.Router.reopen({
  rootURL: '/portal'
});

App.ApplicationRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('user').then(function(user) {
      return user.get('firstObject');
    });
  },
  actions: {
    error: function(error, transition) {
      console.log(error.message)
    }
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

App.InvestigationRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('investigation', params.investigation_id);    
  },
  afterModel: function(investigation) {
    var self = this;
    
    investigation.get('charts').then(function(charts) {
      var chart = charts.get('firstObject');
      
      if (chart) {
        self.transitionTo('chart', chart);
      }
    })
  }
})