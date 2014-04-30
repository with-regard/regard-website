App.Project = DS.Model.extend({
  name: DS.attr('string', {defaultValue: 'New project'}),
  investigations: DS.hasMany('investigation', {async: true}),
  user: DS.belongsTo('user')
});