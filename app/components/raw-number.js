import Ember from 'ember';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default Ember.Component.extend({
  value: 0,

  update: function() {
    this.set('value', numberWithCommas(this.get('data.firstObject.value')));
  }.observes('data')
});
