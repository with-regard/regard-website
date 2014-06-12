App.Router.map(function () {
  
  this.route('userevents', {path: '/userevents/:userevent_id'});
  
  this.resource('projects', {path: '/project'}, function() {
    this.resource('user-welcome');
    
    this.resource('project', {path: '/:project_id'}, function() {
      this.resource('investigation', {path: '/:investigation_id'}, function() {
        this.route('new');
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
  afterModel: function(user) {
    if(user.get('isUser')) {
      this.transitionTo('userevents', user.get('userId'));
    }
  }
});

App.ProjectRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('project', params.project_id);    
  },
  afterModel: function(project, transition) {
    if(transition.targetName == 'project.index') {
      var self = this;
    
      project.get('investigations').then(function(investigations){
        self.transitionTo('investigation', investigations.get('firstObject'));
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

App.InvestigationRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('investigation', params.investigation_id)
  },
  afterModel: function(investigation, transition) {
    if(!investigation.get('queryDefinition') || transition.targetName == 'investigation.new') {
      this.transitionTo('investigation.new');
    } else {
      var promise = new Ember.RSVP.Promise(function(resolve, reject) {
        var adapter = new App.ApplicationAdapter;
        $.getJSON(adapter.buildURL('chartdata', investigation.id), resolve).fail(reject)
      });
      
      promise.then(function(data){
        investigation.set('chartdata', data)
      });
      
      return promise;
    } 
  }
})