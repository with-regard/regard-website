import ajax from 'ic-ajax';
import Ember from "ember";

export default Ember.Object.extend({
  find: function(organizationId, projectId, chartId) {
    var url = [DashboardENV.WEBSITE_DATASTORE_URL, 'v1', 'chartdata', organizationId, projectId, chartId].join('/');
    return ajax(url).then(function(data) {
      return data.map(function(x) {
        if(!x.hasOwnProperty('value')) {
          x.value = x.EventCount;
        }
        return x;
      });
    });
  }
});
