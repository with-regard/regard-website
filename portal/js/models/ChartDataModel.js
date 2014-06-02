App.Chartdata = DS.Model.extend({
  chart: DS.belongsTo('investigation'),
  values: DS.attr()
});