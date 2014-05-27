App.InvestigationController = App.AuthenticationController.extend({
  actions: {
    createBarChart: function () {
      var chart = this.store.createRecord('chart');
      var investigation = this.get('model');

      var self = this;
      
      chart.save().then(function () {
        investigation.get('charts').then(function (charts) {
          charts.pushObject(chart);
          investigation.save();
          
          self.transitionTo('chart.edit', chart);
        });
      });
    }
  }
});