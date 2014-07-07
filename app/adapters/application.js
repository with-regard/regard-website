import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: DashboardENV.WEBSITE_API_URL,
  namespace: 'v1',
  ajax: function(url, method, hash) {
    hash = hash || {};
    hash.xhrFields = {withCredentials: true};
    return this._super(url, method, hash);
  }
});
