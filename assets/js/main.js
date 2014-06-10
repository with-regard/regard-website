$(document).foundation();

requirejs.config({
    paths: {
        'regard': 'https://github.com/with-regard/regard-js-client/releases/download/v0.2-alpha/regard'
    }
});

require(['regard'], function (regard) {
    var userId = localStorage.getItem('userId');

    if (userId) {
        regard.setUserId(userId);
    } else {
        localStorage.setItem('userId', regard.getUserId());
    }

    regard.setRegardURL('https://api.withregard.io/track/v1/WithRegard/Regard/event');

    regard.trackEvent('page.visited', {
        'page.url': document.URL
    }).then(function (e) {
        console.log(e)
    });
});