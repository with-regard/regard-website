import Ember from 'ember';
import ContentEditableView from '../views/content-editable';

export default Ember.Handlebars.makeBoundHelper(function() {
  return ContentEditableView;
});
