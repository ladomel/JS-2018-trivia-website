var express = require('express');
var router = express.Router();
var db = require('../controllers/dbController');

router.post('/login', function(req, res, next) {
    console.log("login:", req.body);
    console.log(db.getUser(req.body.username));
});

router.post('/logout', function(req, res, next) {
    console.log("logout:", req.body);
    console.log(db.getUser(req.body.username));
});

router.post('/register', function(req, res, next) {
    console.log("register:", req.body);
    if (!db.getUser(req.body.username))
        console.log(db.saveUser(req.body.username, req.body.password));
});

module.exports = router;
