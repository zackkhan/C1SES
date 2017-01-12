var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'C1 Credit Card' });
});

router.get('/customizeCard', function(req, res, next){
  res.render('customize', { title: 'Customize Card' });
});

router.post('/judgeCard', function(req, res, next){
  //res.render('judging', { title: 'Judging You' });
});

router.get('/judgingYou', function(req, res, next){
  res.render('judging', { title: 'Judging You' });
});

router.get('/suggestion', function(req, res, next){
  res.render('suggestion', { title: 'Suggest a Card' });
});

module.exports = router;
