import Ember from 'ember';
import ChartDataController from '../controllers/chart-data';
import Poller from '../mixins/poller';

export default ChartDataController.extend(Poller, {
  init: function() {
    this.set('isLoading', true);
    this.load();
    this.set('isLoading', false);
    this.poll(this.load.bind(this));
  }
});
