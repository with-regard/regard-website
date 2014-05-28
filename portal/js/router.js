App.Router.map(function () {
  this.resource('projects', {path: '/'}, function() {
    this.resource('user-welcome');
    this.resource('project', {path: '/:project_id'}, function() {
      this.resource('investigation', {path: '/:investigation_id'}, function() {
        this.resource('chart', {path: '/:chart_id'}, function(){
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
    var self = this;
    
    return this.store.find('user').then(function(user) {
      return user.get('firstObject');
    }, function(error){
      console.log();
    });
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