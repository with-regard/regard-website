App.InvestigationController = Ember.ObjectController.extend({
  actions: {
    createChart: function(){
      var chart = this.store.createRecord('chart');
      var investigation = this.get('model');
      
      chart.save().then(function(){
        investigation.get('charts').then(function(charts){
          charts.pushObject(chart);
          investigation.save();
        });
      });
    }
  }
});