import AuthenticationController from './authentication';
import ApplicationAdapter from '../adapters/application';

export default AuthenticationController.extend({
  actions: {
    deleteData: function () {
      var model = this.get('model');
      var organization = this.get('organization');
      var project = this.get('project');
      var id = this.get('id');

      var adapter = new ApplicationAdapter();
      var url = adapter.buildURL('userevents', [organization, project, id, 'delete-data'].join('/')); // this should be in the adapter

      $.post(url).complete(function () {
        // hack
        model.set('events', []);
      });
    }
  }
});
