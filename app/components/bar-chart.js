import Ember from 'ember';
import charts from 'regard-highcharts';

export default Ember.Component.extend({
  draw: function (data, xAxisLabel, yAxisLabel) {
    var chartData = charts.bar(data, xAxisLabel, yAxisLabel);
    this.$().highcharts(chartData);
  },

  update: function () {
    var data = this.get('data');
    var xAxisLabel = this.get('xAxisLabel');
    var yAxisLabel = this.get('yAxisLabel');

    this.draw(data, xAxisLabel, yAxisLabel);
  }.observes('data')
});
