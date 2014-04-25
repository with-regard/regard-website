App.Project = DS.Model.extend({
  name: DS.attr('string'),
  investigations: DS.hasMany('investigation')
});