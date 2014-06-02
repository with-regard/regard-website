App.Investigation = DS.Model.extend({
  name: DS.attr('string', {defaultValue: 'New investigation'}),
  chartdata: DS.hasMany('chartdata', {async: true}),
  queryDefinition: DS.attr('string'),
  
  project: DS.belongsTo('project')
});