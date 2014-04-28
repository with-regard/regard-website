App.Project = DS.Model.extend({
  name: DS.attr('string', {defaultValue: 'My new project'}),
  investigations: DS.hasMany('investigation')
});