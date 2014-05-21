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
  didInsertElement: function() {
    $(document).foundation();
  }
})