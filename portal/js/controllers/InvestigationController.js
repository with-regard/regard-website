App.InvestigationController = Ember.ObjectController.extend({
  actions: {
    createChart: function(){
      var self = this;
      
      var chartdata = self.store.createRecord('chartdata');
      
      chartdata.save().then(function() {
        var chart = self.store.createRecord('chart');
        chart.get('chartdata').then(function(chartdatas) {
          chartdatas.pushObject(chartdata);
        
          chart.save().then(function(){
            var investigation = self.get('model');
            investigation.get('charts').then(function(charts){
              charts.pushObject(chart);
              investigation.save();
            });
          });
        });
      });
    }
  }
});