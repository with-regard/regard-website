import ajax from 'ic-ajax';
import Ember from "ember";
import async from '../modules/async';

export default Ember.Object.extend({
  find: async(function* (organizationId, projectId, chartId) {
    var url = [DashboardENV.WEBSITE_DATASTORE_URL, 'v1', 'chartdata', organizationId, projectId, chartId].join('/');
    return yield ajax(url);
  })
});
