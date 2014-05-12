App.BarChartComponent = Ember.Component.extend({
  tagName: 'svg',
  attributeBindings: 'width height'.w(),
  margin: {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  },

  w: function () {
    return this.get('width') - this.get('margin.left') - this.get('margin.right');
  }.property('width'),

  h: function () {
    return this.get('height') - this.get('margin.top') - this.get('margin.bottom');
  }.property('height'),

  transformG: function () {
    return "translate(" + this.get('margin.left') + "," + this.get('margin.top') + ")";
  }.property(),

  transformX: function () {
    return "translate(0," + this.get('h') + ")";
  }.property('h'),

  draw: function () {
    var formatPercent = d3.format(".0%");
    var width = this.get('w');
    var height = this.get('h');
    var data = this.get('data');
    var svg = d3.select('#' + this.get('elementId'));
    var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);
    var y = d3.scale.linear().range([height, 0]);
    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5).tickFormat(formatPercent);

    x.domain(data.map(function (d) {
      return d.name;
    }));
    y.domain([0, d3.max(data, function (d) {
      return d.value;
    })]);

    svg.select(".axis.x").call(xAxis);
    svg.select(".axis.y").call(yAxis);

    svg.select(".rects").selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return x(d.name);
      })
      .attr("y", height)
      .attr("width", x.rangeBand())
      .attr("height", 0)
      .transition()
        .delay(function(d, i) { return i * 50; }) // time between drawing bars
        .duration(400) // time to grow the bar to full height
      .attr("y", function (d) {
        return y(d.value);
      })
      .attr("height", function (d) {
        return height - y(d.value);
      })
    
      
  },

  didInsertElement: function () {
    this.draw();
  }
});