import AuthenticationController from '../authentication';
import async from '../../modules/async';

export default AuthenticationController.extend({
  actions: {
    createBarChart: async(function* () {
      var investigation = this.get('model');
      investigation.set('queryDefinition', this.get('queryDefinition'));
      investigation.set('xAxisLabel', this.get('xAxisLabel'));
      investigation.set('yAxisLabel', this.get('yAxisLabel'));

      var investigation = yield investigation.save()
      this.transitionToRoute('investigation', investigation);
    })
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
    };

    return JSON.stringify(barChartQuery, undefined, 4).fmt(this.get('selectedVerb'), this.get('xAxisLabel'), this.get('yAxisLabel'), this.get('eventType'));
  }.property('selectedVerb', 'xAxisLabel', 'yAxisLabel', 'eventType'),

  verbs: ['Sum', 'Mean', 'Min', 'Max', 'CountUniqueValues'],
});
