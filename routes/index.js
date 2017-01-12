var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'C1 Credit Card' });
});

router.get('/customizeCard', function(req, res, next){
  res.render('customize', { title: 'Customize Card' });
});

router.post('/judgeUser', function(req, res, next){
  res.redirect("/judgingYou?email=" + req.body.email
    + "&cashortravel=" + req.body.cashortravel
  );
});

router.post('/judgeCard', function(req, res, next){

  res.redirect("/judgingYou?income=" + req.body.income 
    + "&debt=" + req.body.debt
    + "&zip=" + req.body.zip
    + "&cashortravel=" + req.body.cashortravel
  );

});

router.get('/judgingYou', function(req, res, next){
      
    if(req.query.email){
      res.render('judging', 
      { title: 'Judging You', 
        email: req.query.email,
        cashortravel: req.query.cashortravel
      });
    } else {
      res.render('judging', 
      { title: 'Judging You', 
        income: req.query.income, 
        debt: req.query.debt, 
        zip: req.query.zip, 
        cashortravel: req.query.cashortravel 
      });
    }
});

router.get('/suggestion', function(req, res, next){
  res.render('suggestion', { title: 'Suggest a Card' });
});

module.exports = router;
