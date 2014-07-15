/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    environment: environment,
    baseURL: '/dashboard',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // LOG_MODULE_RESOLVER is needed for pre-1.6.0
    // ENV.LOG_MODULE_RESOLVER = true;

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_MODULE_RESOLVER = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.WEBSITE_API_URL = "http://int-dev.withregard.io:3001";
    ENV.WEBSITE_DATASTORE_URL = "http://int-dev.withregard.io:3002";
  }

  if (environment === 'production') {
    ENV.WEBSITE_API_URL = "https://website-api.withregard.io";
    ENV.WEBSITE_DATASTORE_URL = "https://website-datastore.withregard.io";
  }

  return ENV;
};
