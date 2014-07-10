import Ember from 'ember';
import ApplicationAdapter from '../adapters/application';
import AuthenticationController from './authentication';

export default AuthenticationController.extend({
  needs: ['project'],

  init: function() {
    var self = this;

    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
      var adapter = new ApplicationAdapter();
      $.getJSON(adapter.buildURL('chartdata', self.get('id')), resolve).fail(reject);
    }).then(function(data) {
      self.set('chartdata', data);
    });
  },

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
