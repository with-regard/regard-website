import ajax from 'ic-ajax';
import Ember from "ember";

export default Ember.Object.extend({
  deleteData: function(organizationId, projectId, chartId) {
    var url = [DashboardENV.WEBSITE_DATASTORE_URL, 'v1', 'userevents', organizationId, projectId, chartId, 'delete-data'].join('/');
    return ajax.post(url);
  }
});
