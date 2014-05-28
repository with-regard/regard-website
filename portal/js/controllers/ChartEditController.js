App.ChartEditController = App.AuthenticationController.extend({
  actions: {
    registerQuery: function() {
      console.log('registering a query');
      var chart = this.get('model');
      chart.save();
    }
  }
});