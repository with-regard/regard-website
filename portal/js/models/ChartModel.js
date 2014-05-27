App.Chart = DS.Model.extend({
  queryDefinition: DS.attr('string'),
  queryName: DS.attr('string'),
  chartdata: DS.hasMany('chartdata', {async: true}),
  investigation: DS.belongsTo('investigation')
});