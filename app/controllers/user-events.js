import AuthenticationController from './authentication';
import UserDataAdapter from '../adapters/user-data';

export default AuthenticationController.extend({
  actions: {
    deleteData: function () {
      var model = this.get('model');
      var organization = this.get('organization');
      var project = this.get('project');
      var id = this.get('id');

      var adapter = UserDataAdapter.create();
      adapter.deleteData(organization, project, id).done(function () {
        // hack
        model.set('events', []);
      });
    }
  }
});
