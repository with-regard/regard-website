App.User = DS.Model.extend({
  name: DS.attr('string'),
  projects: DS.hasMany('project', {async: true}),
  isDeveloper: DS.attr('boolean'),
  isAnonymous: DS.attr('boolean')
});