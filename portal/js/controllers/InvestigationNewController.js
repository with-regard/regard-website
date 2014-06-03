App.InvestigationNewController = App.AuthenticationController.extend({
  init: function() {
    this.loadEventTypes();
  },
  
  actions: {
    createBarChart: function () {
      var self = this;
      
      var investigation = this.get('model');
      investigation.set('queryDefinition', this.get('queryDefinition'))
      
      investigation.save().then(function () {
        self.transitionToRoute('investigation', investigation);
      });
    }
  },
  
  queryDefinition: function() {
    var barChartQuery = {
       "verb":"%@",
       "key":"%@",
       "name":"value",
       "applies-to":{
          "verb":"BrokenDownBy",
          "key":"%@",
          "name":"name",
          "applies-to":{
             "verb":"Only",
             "key":"event-type",
             "value":"%@",
             "applies-to":{
                "verb":"AllEvents",
                "applies-to":{

                }
             }
          }
       }
    }
    
    return JSON.stringify(barChartQuery, undefined, 4).fmt(this.get('selectedVerb'), this.get('x-axis-label'), this.get('y-axis-label'), this.get('selectedEventType'))
  }.property('selectedVerb', 'x-axis-label', 'y-axis-label', 'selectedEventType'),
  
  verbs: ['Sum', 'Mean', 'Min', 'Max', 'CountUniqueValues'],
  
  loadEventTypes: function() {
    // See: https://github.com/with-regard/regard-query/wiki/Common-queries
    var self = this;
    var adapter = new App.ApplicationAdapter;
    $.getJSON(adapter.buildURL('chartdata', 'event-types'), function(data){
      var events = data.mapBy('event-type')
      self.set('eventTypes', events);
      self.set('selectedEventType', events.get('firstObject'));
    })
  },
});