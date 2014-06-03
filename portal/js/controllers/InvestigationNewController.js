App.InvestigationNewController = App.AuthenticationController.extend({
  actions: {
    createBarChart: function () {
      var self = this;
      var investigation = this.get('model');

      investigation.save().then(function () {
        self.transitionToRoute('investigation', investigation);
      });
    }
  }
});