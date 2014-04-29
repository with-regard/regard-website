App.Project = DS.Model.extend({
  name: DS.attr('string', {defaultValue: 'New project'}),
  investigations: DS.hasMany('investigation', {embedded: 'always'})
});