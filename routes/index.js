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
          {id: 6, name: "F"}
      ],
      relations: [
          [1, 2],
          [1, 3],
          [2, 4],
          [3, 4],
          [3, 5],
          [4, 5],
          [4, 6],
          [5, 6]
      ],
      loggedIn: false
  });
});

module.exports = router;
