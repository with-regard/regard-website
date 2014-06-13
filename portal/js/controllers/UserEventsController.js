App.UsereventsController = App.AuthenticationController.extend({
  actions: {
    deleteData: function () {
      var self = this;
      
      var adapter = new App.ApplicationAdapter;
      var id = this.get('id');
      var url = adapter.buildURL('userevents', [id, 'delete-data'].join('/'));
      
      $.getJSON(url).complete(function () {
        self.get('model').reload();
      });
    }
  }
});