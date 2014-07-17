import ajax from 'ic-ajax';
import Ember from "ember";

export default Ember.Object.extend({
  find: function(organizationId, projectId, chartId) {
    var url = [DashboardENV.WEBSITE_QUERY_API_URL, 'v1', 'chartdata', organizationId, projectId, chartId].join('/');
    return ajax(url).then(function(data) {
      return data.map(function(x) {
        if(!x.hasOwnProperty('value')) {
          x.value = x.EventCount;
        }
        x.value = (+x.value).toFixed(0);
        return x;
      });
    });
  }
});
