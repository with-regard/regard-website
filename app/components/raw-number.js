import Ember from 'ember';

export default Ember.Component.extend({
  update: function() {
    this.set('value', this.get('data.firstObject.value'));
  }.observes('data')
});
