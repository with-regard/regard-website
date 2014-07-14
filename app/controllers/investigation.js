import Ember from 'ember';
import ChartDataAdapter from '../adapters/chart-data';
import AuthenticationController from './authentication';

export default AuthenticationController.extend({
  needs: ['project'],

  init: function() {
    var self = this;
    self.set('isLoading', true);

    var adapter = ChartDataAdapter.create();
    adapter.find(self.get('id')).then(function(data) {
      self.set('isLoading', false);
      self.set('chartdata', data);
    });
  },

  actions: {
    deleteInvestigation: function () {
      var self = this;

      var investigation = this.get('model');
      var project = this.get('controllers.project.content');

      project.get('investigations').then(function (investigations) {
        investigations.removeObject(investigation);
        project.save();
        investigation.destroyRecord();
        self.transitionToRoute('investigation', investigations.get('firstObject'));
      });
    },
  }
});
