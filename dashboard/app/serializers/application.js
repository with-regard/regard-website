import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: '_id',
  serializeHasMany: function (record, json, relationship) {
    var key = relationship.key;
    var relationshipType = DS.RelationshipChange.determineRelationshipType(record.constructor, relationship);

    if (relationshipType === 'manyToNone' || relationshipType === 'manyToMany' || relationshipType === 'manyToOne') {
      json[key] = Ember.get(record, key).mapBy('id');
    }
  }
});
