var App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true
});

Ember.Inflector.inflector.irregular('chartdata', 'chartdata');


App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'https://website-api.withregard.io',
  namespace: 'v1',
  ajax: function(url, method, hash) {
    hash = hash || {};
    hash.xhrFields = {withCredentials: true};
    return this._super(url, method, hash);
  }
});

App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: '_id',
  serializeHasMany: function (record, json, relationship) {
    var key = relationship.key;
    var relationshipType = DS.RelationshipChange.determineRelationshipType(record.constructor, relationship);

    if (relationshipType === 'manyToNone' || relationshipType === 'manyToMany' || relationshipType === 'manyToOne') {
      json[key] = Ember.get(record, key).mapBy('id');
    }
  }
});

App.ProjectView = Ember.View.extend({
  didInsertElement: function () {
    $(document).foundation();
  }
});

App.ContentEditableView = Ember.View.extend({
  tagName: 'span',
  classNames: ['editable'],
  attributeBindings: ['contenteditable'],
  editable: false,

  contenteditable: (function () {
    var editable = this.get('editable');
    return editable ? 'true' : undefined;
  }).property('editable'),

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
      if (!editable.is(e.target)) {
        e.target.blur();
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
      this.set('value', this.$().text());
    }
  },

  click: function () {

  },

  focusIn: function () {

  },

  focusOut: function () {
    if (this.get('value') !== this.get('originalValue')) {
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

Ember.Handlebars.helper('editable', App.ContentEditableView);