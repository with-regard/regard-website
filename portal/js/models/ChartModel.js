App.Chart = DS.Model.extend({
  query: DS.attr('string'),
  chartdata: DS.hasMany('chartdata', {async: true}),
  investigation: DS.belongsTo('investigation')
});