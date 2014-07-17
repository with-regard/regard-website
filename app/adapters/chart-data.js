import ajax from 'ic-ajax';
import Ember from "ember";
import async from '../modules/async';

export default Ember.Object.extend({
  find: async(function* (organizationId, projectId, chartId) {
    var url = [DashboardENV.WEBSITE_QUERY_API_URL, 'v1', 'chartdata', organizationId, projectId, chartId].join('/');
    var data = yield ajax(url);
    return data.map(x => {
      if(!x.hasOwnProperty('value')) {
        x.value = x.EventCount;
      }
      x.value = (+x.value).toFixed(0);
      return x;
    });
  })
});
