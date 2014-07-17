import Ember from 'ember';
import charts from 'regard-highcharts';

export default Ember.Component.extend({
  draw: function (data, xAxisLabel, yAxisLabel) {
    var data = this.get('data');
    var xAxisLabel = this.get('xAxisLabel');
    var yAxisLabel = this.get('yAxisLabel');

    var chartData = charts.bar(data, xAxisLabel, yAxisLabel);
    chartData.chart.renderTo = this.$()[0];
    var chart = new Highcharts.Chart(chartData);

    this.set('chart', chart);
  },

  redraw: function(data) {
    var chart = this.get('chart');

    if(chart && chart.series[0].data.length === data.length) {
      var newPoints = data.map(x => x.value);

      $.each(chart.series[0].data, function (i, point) {
        point.update(newPoints[i], false);
      });

      chart.redraw();
    } else {
      this.draw();
    }
  },

  update: function () {
    this.redraw();
  }.observes('data')
});
