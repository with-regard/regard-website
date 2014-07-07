import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  isDeveloper: DS.attr('boolean'),
  isUser: DS.attr('boolean'),
  isAnonymous: DS.attr('boolean'),
  userId: DS.attr('string')
});
