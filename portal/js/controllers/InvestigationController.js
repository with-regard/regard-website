App.InvestigationController = Ember.ObjectController.extend({
  actions: {
    createChart: function(){
      var chartdata = this.store.createRecord('chartdata');
      
      chartdata.save().then(function() {
        var chart = this.store.createRecord('chart');
        chart.get('chartdata').then(function(chartdatas) {
          chartdatas.pushObject(chartdata);
          chart.save().then(function(){
            var investigation = this.get('model');
            investigation.get('charts').then(function(charts){
              charts.pushObject(chart);
              investigation.save().then(function() {
                this.store.createRecord('chartdata');
              });;
            });
          });
        });
      });
    }
  }
});