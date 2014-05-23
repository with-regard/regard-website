App.BarChartComponent = Ember.Component.extend({
  tagName: 'svg',
  attributeBindings: 'width'.w(),
  barHeight: 20,
  yAxisLabelsWidth: 240,

  w: function () {
    return this.get('width') - this.get('yAxisLabelsWidth') - 20;
  }.property('width'),

  transformG: function () {
    return "translate(" + this.get('yAxisLabelsWidth') + "," + "22" + ")";
  }.property(),

  draw: function () {
    var width = this.get('w');
    var data = this.get('data').sort(function (a, b) {
      return d3.descending(+a.value, +b.value);
    });

    var svg = d3.select('#' + this.get('elementId'));

    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.ordinal().rangeRoundBands([0, data.length * this.get('barHeight')], 0.1);

    var xAxis = d3.svg.axis().scale(x).orient("top").tickFormat(d3.format("d")).tickSubdivide(0);
    var yAxis = d3.svg.axis().scale(y).orient("left");

    var roundedValues = function (d, index) {
      return Math.round(data[index].value);
    }

    var valueAxis = d3.svg.axis().scale(y).orient("left").tickFormat(roundedValues);

    var max = d3.max(data, function (d) {
      return +d.value;
    });

    x.domain([0, max]);
    y.domain(data.map(function (d) {
      return d.name;
    }));

    svg.select(".axis.x").call(xAxis);
    svg.select(".axis.y").attr("transform", "translate(-40,0)").call(yAxis);
    svg.select(".axis.value").call(valueAxis);

    svg.select(".chart").selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("y", function (d) {
        return y(d.name);
      })
      .attr("x", 0)
      .attr("height", y.rangeBand())
      .attr("width", 0)
      .transition()
      .delay(function (d, i) {
        return i * 20;
      }) // time between drawing bars
    .duration(400) // time to grow the bar to full width
    .attr("x", 0)
      .attr("width", function (d) {
        return x(d.value);
      });
  },

  didInsertElement: function () {
    this.draw();
  }
});