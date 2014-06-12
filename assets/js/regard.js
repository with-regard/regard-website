"use strict";

requirejs.config({
    paths: {
        'regard': 'https://github.com/with-regard/regard-js-client/releases/download/v0.3-alpha/regard'
    }
});

require(['regard'], function (regard) {
    var userId = localStorage.getItem('userId');
    var sessionId = sessionStorage.getItem('sessionId');

    if (!userId) {
        userId = regard.getUserId();
        localStorage.setItem('userId', userId);
    } 
    
    if (!sessionId) {
        sessionId = regard.getSessionId();
        sessionStorage.setItem('sessionId', sessionId);
    }

    regard.setSessionId(sessionId);
    regard.setUserId(userId);
    regard.setRegardURL('https://api.withregard.io/track/v1/regard/website/event');

    regard.trackEvent('page.visited', {
        'page.path': location.pathname
    }).then(function (e) {
        console.log(e)  
    });
  
    var userEventsLink = 'https://withregard.io/portal#/userevents/' + userId;
  
    $('#userLink').append('<a href=\"'+userEventsLink + '\">My data</a>');
    $('#user-events').attr('src', userEventsLink);
});
