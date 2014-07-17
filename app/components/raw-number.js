import Ember from 'ember';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default Ember.Component.extend({
  value: 0,
  spin: function() {
    var steps = 20;
    var totalTime = 500;

    var targetValue = this.get('targetValue');

    for (var i = 0; i <= steps; i++) {
      (function(num) {
        return function() {
          Ember.run.later(this, function() {
            var intermediateValue = Math.floor(targetValue / steps * num);
            this.set('value', numberWithCommas(intermediateValue));
          }, totalTime / steps * num);
        }
      })(i).call(this);
    }
  },

  update: function() {
    var newValue = this.get('data.firstObject.value');

    if(this.get('targetValue') !== newValue){
      this.set('targetValue', newValue);
      this.spin();
    }
  }.observes('data')
});
