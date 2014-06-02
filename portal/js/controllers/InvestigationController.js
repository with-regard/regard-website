App.InvestigationController = App.AuthenticationController.extend({
  actions: {
    createBarChart: function () {
      var self = this;
      var investigation = this.get('model');

      investigation.save().then(function () {
        var chartdata = self.store.createRecord('chartdata', {
          id: investigation.id
        });

        investigation.get('chartdata').then(function (chartdatas) {
          chartdatas.clear();
          chartdatas.pushObject(chartdata);
          investigation.save().then(function () {
            chartdata.reload();
          });
        });
      });
    }
  }
});