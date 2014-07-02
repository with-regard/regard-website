"use strict";

requirejs.config({
  paths: {
    'regard': 'https://github.com/with-regard/regard-js-client/releases/download/v0.5-alpha/regard'
  }
});

require(['regard'], function (regard) {
  $('.usereventslink').attr('href', 'userdata/regard/website/' + regard.getUserId());

  regard.setOrganization('regard');
  regard.setProduct('website');

  regard.trackEvent('page.visited', {
    'page.path': location.pathname,
    'page.referrer': document.referrer
  }).then(function (e) {
    console.log(e)
  });

});