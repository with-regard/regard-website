import Ember from 'ember';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateValue(target, i, steps) {
  var totalTime = 500;

  Ember.run.later(this, function() {
    var intermediateValue = Math.floor(target / steps * i);
    this.set('value', numberWithCommas(intermediateValue));
  }, totalTime / steps * i);
}

export default Ember.Component.extend({
  value: 0,
  spin: function(target) {
    var steps = 20;

    for (var i = 1; i <= steps; i++) {
      updateValue.call(this, target, i, steps);
    }
  },

  update: function() {
    var newValue = this.get('data.firstObject.value');

    if(this.get('previousValue') !== newValue){
      this.set('previousValue', newValue);
      this.spin(newValue);
    }
  }.observes('data')
});
