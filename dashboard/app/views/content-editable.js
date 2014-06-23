import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'span',
  classNameBindings: ['canEdit'],
  attributeBindings: ['contenteditable'],
  editable: false,

  contenteditable: function () {
    var editable = this.get('editable');
    return editable ? 'true' : undefined;
  }.property('editable'),

  canEdit: function() {
    return this.get('editable') ? 'editable' : '';
  }.property('canEdit'),

  // Observers:
  valueObserver: (function () {
    if (this.get('value')) {
      this.setContent();
    }
  }).observes('value'),

  // Events:
  didInsertElement: function () {
    var model = this.get('controller.model');
    this.set('model', model);
    this.set('originalValue', this.get('value'));

    this.listenForClickedOutside();
    this.setContent();
  },

  listenForClickedOutside: function () {
    $(document).mouseup(function (e) {
      var editable = $('.editable');

      // if the target of the click isn't the editable
      if (!editable.is(e.target) && editable.is(":focus")) {
        editable.blur();
      }
    });
  },

  keyDown: function (e) {
    // handle enter
    if (e.keyCode === 13) {
      e.target.blur();
    }
  },

  keyUp: function (e) {
    // handle escape
    if (e.keyCode == 27) {
      this.set('value', this.get('originalValue'));
      e.target.blur();
    } else {
      this.set('hasEdited', true);
      this.set('value', this.$().text());
    }
  },

  click: function () {

  },

  focusIn: function () {

  },

  focusOut: function () {
    if (this.get('hasEdited')) {
      this.get('model').save();
    }
  },

  blur: function () {

  },

  paste: function () {

  },

  setContent: function () {
    this.$().html(this.get('value'));
  }
});
