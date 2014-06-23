var express = require('express');
var router = express.Router();

router.get('/userdata/:organization/:product/:user', function (req, res, next) {
  res.redirect(['/portal#', 'userevents', req.params.organization, req.params.product, req.params.user].join('/'));
});

module.exports = router;
