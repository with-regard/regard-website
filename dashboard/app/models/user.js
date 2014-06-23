import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  projects: DS.hasMany('project', {async: true}),
  isDeveloper: DS.attr('boolean'),
  isUser: DS.attr('boolean'),
  isAnonymous: DS.attr('boolean'),
  userId: DS.attr('string')
});
