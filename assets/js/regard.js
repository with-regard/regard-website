"use strict";

requirejs.config({
    paths: {
        'regard': 'https://github.com/with-regard/regard-js-client/releases/download/v0.3-alpha/regard'
    }
});

require(['regard'], function (regard) {
    var userId = localStorage.getItem('userId');
    var sessionId = sessionStorage.getItem('sessionId');

    if (userId) {
        regard.setUserId(userId);
    } else {
        localStorage.setItem('userId', regard.getUserId());
    }

    if (sessionId) {
        regard.setSessionId(sessionId);
    } else {
        sessionStorage.setItem('sessionId', regard.getSessionId());
    }

    regard.setRegardURL('https://api.withregard.io/track/v1/regard/website/event');

    regard.trackEvent('page.visited', {
        'page.url': document.URL
    }).then(function (e) {
        console.log(e)
    });
});