App.UsereventsController = App.AuthenticationController.extend({
  actions: {
    deleteData: function () {
      var model = this.get('model');
      var organization = this.get('organization');
      var product = this.get('product');
      var id = this.get('id');
      
      var adapter = new App.ApplicationAdapter;
      var url = adapter.buildURL('userevents', [organization, product, id, 'delete-data'].join('/')); // this should be in the adapter
      
      $.post(url).complete(function () {
        // hack
        model.set('events', []);
      });
    }
  }
});
