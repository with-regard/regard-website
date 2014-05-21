App.Chartdata = DS.Model.extend({
  chart: DS.belongsTo('chart'),
  values: DS.attr()
});