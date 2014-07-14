import AuthenticationController from './authentication';
import UserDataAdapter from '../adapters/user-data';

var adapter = UserDataAdapter.create();

export default AuthenticationController.extend({
  actions: {
    deleteData: function () {
      var model = this.get('model');
      var organization = this.get('organization');
      var product = this.get('product');
      var id = this.get('id');

      adapter.deleteData(organization, product, id).done(function () {
        // hack
        model.set('events', []);
      });
    }
  }
});
