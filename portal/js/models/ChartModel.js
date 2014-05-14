App.Chart = DS.Model.extend({
  query: DS.attr('string'),
  chartData: DS.attr(),
  investigation: DS.belongsTo('investigation')
});