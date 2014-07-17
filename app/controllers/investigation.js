import Ember from 'ember';
import ChartDataAdapter from '../adapters/chart-data';
import async from '../modules/async';

export default Ember.ObjectController.extend({
  needs: ['project'],

  init: async(function* () {
    var self = this;
    self.set('isLoading', true);

    var organization = self.get('data.organization');
    var project = self.get('data.product');

    var adapter = ChartDataAdapter.create();
    var data = yield adapter.find(organization, project, self.get('id'));
    self.set('isLoading', false);
    self.set('chartdata', data);
  }),

  actions: {
    deleteInvestigation: async(function* () {
      var self = this;

      var investigation = this.get('model');
      var project = this.get('controllers.project.content');

      var investigations = yield project.get('investigations')
      investigations.removeObject(investigation);
      project.save();
      investigation.destroyRecord();
      self.transitionToRoute('investigation', investigations.get('firstObject'));
    }),
  }
});
