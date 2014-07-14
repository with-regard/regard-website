import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string', {
    defaultValue: 'New investigation'
  }),
  queryDefinition: DS.attr('string'),
  xAxisLabel: DS.attr('string'),
  yAxisLabel: DS.attr('string'),
  visualizationType: DS.attr('string'),

  project: DS.belongsTo('project')
});
