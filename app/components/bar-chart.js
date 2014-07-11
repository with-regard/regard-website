import Ember from 'ember';

export default Ember.Component.extend({
  draw: function (data, xAxisLabel, yAxisLabel) {
    this.$().highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                title: {
                  text: xAxisLabel
                },
                categories: data.map(function(x) {
                  return x.name;
                }),
            },
            yAxis: {
                min: 0,
                title: {
                    text: yAxisLabel
                }
            },
            legend: {
              enabled: false
            },
            credits: {
              enabled: false
            },
            colors: ['#73B02D'],
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                data: data.map(function(x) {
                  return +x.value;
                })
            }]
        });
  },

  update: function () {
    var data = this.get('data');
    var xAxisLabel = this.get('xAxisLabel');
    var yAxisLabel = this.get('yAxisLabel');

    this.draw(data, xAxisLabel, yAxisLabel);
  }.observes('data')
});
