App.InvestigationController = App.AuthenticationController.extend({
  actions: {
    createBarChart: function () {

      var queryDefinition = this.get('queryDefinition');
      var queryName = this.get('queryName');

      var chart = this.store.createRecord('chart', {
        queryDefinition: queryDefinition,
        queryName: queryName
      });

      var investigation = this.get('model');
      var self = this;

      chart.save().then(function () {
        investigation.get('charts').then(function (charts) {
          charts.pushObject(chart);
          investigation.save();

          var chartdata = self.store.createRecord('chartdata', {
            id: chart.id
          });

          chart.get('chartdata').then(function (chartdatas) {
            chartdatas.clear();
            chartdatas.pushObject(chartdata);
            chart.save().then(function () {
              chartdata.reload().then(function () {
                self.transitionToRoute('chart', chart);
              });
            });
          });
        });
      });
    }
  }
});