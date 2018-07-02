var express = require('express');
var router = express.Router();

router.get('/play', function(req, res, next) {
    res.render('index', { title: 'play' });
});

module.exports = router;
