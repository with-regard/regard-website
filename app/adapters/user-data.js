import ajax from 'ic-ajax';
import Ember from "ember";

export default Ember.Object.extend({
  find: function(organizationId, projectId, chartId) {
    var url = [DashboardENV.WEBSITE_DATASTORE_URL, 'v1', 'userevents', organizationId, projectId, chartId].join('/');
    return ajax(url);
  },

  deleteData: function(organizationId, projectId, chartId) {
    var url = [DashboardENV.WEBSITE_DATASTORE_URL, 'v1', 'userevents', organizationId, projectId, chartId, 'delete-data'].join('/');
    return $.delete(url);
  }
});
