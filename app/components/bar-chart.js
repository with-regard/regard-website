import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'canvas',

  draw: function () {
    Chart.defaults.global.responsive = true;

    var context = this.$().get(0).getContext("2d");
    var options = {};

    var rawData = this.get('data');
    var data = {
      labels: rawData.map(function(elem) { return elem.name; }),
      datasets: [
        {
          data: rawData.map(function(elem) { return elem.value; }),

          fillColor: "rgba(115,176,45,0.5)",
          strokeColor: "rgba(115,176,45,0.8)",
          highlightFill: "rgba(115,176,45,0.75)",
          highlightStroke: "rgba(115,176,45,1)",
        }
      ]
    };

    var myBarChart = new Chart(context).Bar(data, options);
  },

  update: function () {
    this.draw();
  }.observes('data')
});
