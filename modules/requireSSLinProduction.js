'use strict';

function requireSSLinProduction(req, res, next) {
  if ((req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'].toLowerCase()) === 'https' || req.headers['x-arr-ssl'] || process.env.NODE_ENV !== 'production') {
    next();
  } else {
    res.redirect('https://' + req.host + req.url);
  }
}

module.exports = requireSSLinProduction;