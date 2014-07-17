import Ember from 'ember';

export default Ember.Mixin.create({
  poll: function(fn) {
    setInterval(fn, 10*1000); //every 10 seconds
  }
});
