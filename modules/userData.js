var express = require('express');
var router = express.Router();

router.get('/userdata/:organization/:project/:user', function (req, res, next) {
  res.redirect(['/dashboard/', 'userevents', req.params.organization, req.params.project, req.params.user].join('/'));
});

module.exports = router;
