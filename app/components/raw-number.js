import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['raw-value'],

  didInsertElement: function() {
    this.set('value', this.get('data.firstObject.value'));
  }
});
