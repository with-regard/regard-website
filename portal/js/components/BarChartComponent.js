App.BarChartComponent = Ember.Component.extend({
  tagName: 'svg',
  attributeBindings: 'width height'.w(),
  margin: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  },

  w: function () {
    return this.get('width') - this.get('margin.left') - this.get('margin.right') - 243;
  }.property('width'),

  h: function () {
    return this.get('height') - this.get('margin.top') - this.get('margin.bottom');
  }.property('height'),

  transformG: function () {
    return "translate(" + (this.get('margin.left') + 243) + "," + this.get('margin.top') + ")";
  }.property(),

  transformX: function () {
    return "translate(0," + this.get('h') + ")";
  }.property('h'),

  draw: function () {
    var width = this.get('w');
    var height = this.get('h');
    var data = this.get('data').sort(function (a, b) {
      return d3.descending(a.value, b.value);
    });
    var svg = d3.select('#' + this.get('elementId'));
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.ordinal().rangeRoundBands([1, height], 0.1);
    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left");

    y.domain(data.map(function (d) {
      return d.name;
    }));

    x.domain([0, d3.max(data, function (d) {
      return d.value;
    })]);

    svg.select(".axis.x").call(xAxis);
    svg.select(".axis.y").call(yAxis);

    svg.select(".rects").selectAll("rect")
      .data(data)

    .enter().append("rect")
      .attr("class", "bar")
      .attr("y", function (d) {
        return y(d.name);
      })
      .attr("x", 1)
      .attr("height", y.rangeBand())
      .attr("width", 0)
      .transition()
      .delay(function (d, i) {
        return i * 20;
      }) // time between drawing bars
    .duration(400) // time to grow the bar to full height
    .attr("x", 1)
      .attr("width", function (d) {
        return x(d.value);
      });
  },

  didInsertElement: function () {
    this.draw();
  }
});