App.Investigation = DS.Model.extend({
  name: DS.attr('string', {defaultValue: 'New investigation'}),
  queryDefinition: DS.attr('string'),
  xAxisLabel: DS.attr('string'),
  yAxisLabel: DS.attr('string'),
  organization: DS.attr('string'),
  product: DS.attr('string'),
  project: DS.belongsTo('project')
});