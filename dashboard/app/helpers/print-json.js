import Ember from 'ember';

export default Ember.Handlebars.helper('print-json', function(value, options) {
  var jsonString = Ember.Handlebars.Utils.escapeExpression(JSON.stringify(value, undefined, 4));
  var result = '<pre>' + jsonString + '</pre>';

  return new Ember.Handlebars.SafeString(result);
});
