var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Trivia',
      points: [
          {id: 1, name: "A"},
          {id: 2, name: "B"},
          {id: 3, name: "C"},
          {id: 4, name: "D"},
          {id: 5, name: "E"},
          {id: 6, name: "F"},
          {id: 7, name: "G"},
          {id: 8, name: "H"},
          {id: 9, name: "I"},
          {id: 10, name: "J"},
          {id: 11, name: "K"},
          {id: 12, name: "L"}
      ],
      loggedIn: false
  });
});

module.exports = router;
