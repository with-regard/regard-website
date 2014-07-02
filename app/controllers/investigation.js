import AuthenticationController from './authentication';

export default AuthenticationController.extend({
  needs: ['project'],
  actions: {
    deleteInvestigation: function () {
      var self = this;

      var investigation = this.get('model');
      var project = this.get('controllers.project.content');

      project.get('investigations').then(function (investigations) {
        investigations.removeObject(investigation);
        project.save();
        investigation.destroyRecord();
        self.transitionToRoute('investigation', investigations.get('firstObject'));
      });
    },
  }
});
