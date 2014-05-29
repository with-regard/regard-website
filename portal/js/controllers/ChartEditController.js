App.ChartEditController = App.AuthenticationController.extend({
  actions: {
    registerQuery: function() {
      console.log('registering a query');
      var chart = this.get('model');

      // Put a dummy chartdata in the chart to trigger the async loading of the chart data
      // Since the request will be fulfilled by the query api, don't need to save the record. 
      var chartdata = this.store.createRecord('chartdata');
      chartdata.set('id', chart.id);
      
      chart.get('chartdata').then(function(chartdatas){
        chartdatas.pushObject(chartdata);
        chart.save();
      })
    }
  }
});