import Ember from 'ember';
import ChartDataAdapter from '../adapters/chart-data';

export default Ember.ObjectController.extend({
  needs: ['project'],

  init: function() {
    var self = this;
    self.set('isLoading', true);

    var organization = self.get('data.organization');
    var project = self.get('data.product');

    var adapter = ChartDataAdapter.create();
    adapter.find(organization, project, self.get('id')).then(function(data) {
      self.set('isLoading', false);
      self.set('chartdata', data);
    });
  }
});
