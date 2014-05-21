App.Investigation = DS.Model.extend({
  name: DS.attr('string', {defaultValue: 'New investigation'}),
  project: DS.belongsTo('project'),
  charts: DS.hasMany('chart', {async: true}),
});