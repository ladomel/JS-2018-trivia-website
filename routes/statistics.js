var express = require('express');
var router = express.Router();

router.get('/statistics', function(req, res, next) {
    res.render('index', { title: 'statistics' });
});

module.exports = router;
