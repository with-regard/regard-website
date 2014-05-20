App.Chart = DS.Model.extend({
  query: DS.attr('string'),
  chartdata: DS.hasMany('chartdata'),
  investigation: DS.belongsTo('investigation')
});