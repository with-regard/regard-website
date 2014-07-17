import Ember from 'ember';
import ChartDataAdapter from '../adapters/chart-data';
import async from '../modules/async';

export default Ember.ObjectController.extend({
  load: async(function*() {
    var organization = this.get('data.organization');
    var project = this.get('data.product');

    var adapter = ChartDataAdapter.create();
    var data = yield adapter.find(organization, project, this.get('id'));

    this.set('chartdata', data);
  }),
});
