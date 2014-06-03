App.Investigation = DS.Model.extend({
  name: DS.attr('string', {defaultValue: 'New investigation'}),
  queryDefinition: DS.attr('string'),
  project: DS.belongsTo('project')
});