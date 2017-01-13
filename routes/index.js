var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require('path');
var rp = require('request-promise');

var creditCards = [
  {
    name: "Venture Rewards",
    cashBack: 0.02,
    yearFee: 0, //Annual Fee
    interestRate: 0.2349, //Interest Rate
    signBonus: 100, //Signup Bonus
    signUpLen: 3, //Signup promo length
    promoLen: 0, //Promotional Interest Length
    tranFee: 0, //Transfer Fee Percentage
    introLen: 0, //Transfer Introductory Interest Rate
    minSpend: 500,
      type: "travel"

  },
  {
    name: "Quicksilver Rewards",
    cashBack: 0.015,
    yearFee: 0, //Annual Fee
    interestRate: 0.2349, //Interest Rate
    signBonus: 100, //Signup Bonus
    signUpLen: 3, //Signup promo length
    promoLen: 9, //Promotional Interest Length
    tranFee: 0.03, //Transfer Fee Percentage
    introLen: 9, //Transfer Introductory Interest Rate
    minSpend: 500,
      type: "cash"

  },
  {
    name: "VentureOne Rewards",
    cashBack: 0.0125,
    yearFee: 0, //Annual Fee
    interestRate: 0.2249, //Interest Rate
    signBonus: 200, //Signup Bonus
    signUpLen: 3, //Signup promo length
    promoLen: 12, //Promotional Interest Length
    tranFee: 0, //Transfer Fee Percentage
    introLen: 0, //Transfer Introductory Interest Rate
    minSpend: 1000,
      type: "travel"

  },
  {
    name: "QuicksilverOne Rewards",
    cashBack: 0.015,
    yearFee: 39, //Annual Fee
    interestRate: 0.2499, //Interest Rate
    signBonus: 0, //Signup Bonus
    signUpLen: 0, //Signup promo length
    promoLen: 0, //Promotional Interest Length
    tranFee: 0, //Transfer Fee Percentage
    introLen: 0, //Transfer Introductory Interest Rate
    minSpend: 0,
      type: "cash"

  },
  {
    name: "Platinum",
    cashBack: 0,
    yearFee: 0, //Annual Fee
    interestRate: 0.2499, //Interest Rate
    signBonus: 0, //Signup Bonus
    signUpLen: 0, //Signup promo length
    promoLen: 0, //Promotional Interest Length
    tranFee: 0, //Transfer Fee Percentage
    introLen: 0, //Transfer Introductory Interest Rate
    minSpend: 0,
      type: "cash"

  }
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'C1 Credit Card' });
});

router.get('/customizeCard', function(req, res, next){
  
  var contents = fs.readFileSync(path.join(__dirname, "..", "public/data/cpi.json"));

  var jsonContent = JSON.parse(contents);

  var count = Object.keys(jsonContent).length;

  var locations = [];

  for(i = 0; i < count; i++){
    locations.push("\"" + jsonContent[i].name + "\"");
  }

  res.render('customize', { title: 'Customize Card', locations: locations });

});

router.post('/judgeUser', function(req, res, next){
  res.redirect("/suggestion?email=" + req.body.email
    + "&cashortravel=" + req.body.cashortravel
  );
});

router.post('/judgeCard', function(req, res, next){

  rp("https://odn.data.socrata.com/resource/t64z-nedn.json?variable=index&year=2012&component=All&name=" + req.body.loc).then(function(data){
    
    var cost = (parseInt(JSON.parse(data)[0].value)/100) * 4769;

    res.redirect("/suggestion?income=" + req.body.income 
      + "&debt=" + req.body.debt
      + "&loc=" + req.body.loc
      + "&cashortravel=" + req.body.cashortravel
      + "&cost=" + cost
    );
  });

});

router.get('/suggestion', function(req, res, next){
      
    if(req.query.email){

      rp('http://api.reimaginebanking.com/accounts/5877e7481756fc834d8eace6/purchases?key=b86dd9297128e1a6a6b8e0821692d691').then(function(response){

          var transactionArr = JSON.parse(response);
          var amountArr = [];
          var dateArr = [];
          var monthlySpendArr = [0,0,0,0,0,0,0,0,0,0,0,0,0];
          var monthlyBalanceArr = [0,0,0,0,0,0,0,0,0,0,0,0,0];
          var index;

          for (var i=0; i<transactionArr.length; i++) {

              amountArr.push(transactionArr[i].amount);
              dateArr.push(transactionArr[i].purchase_date);

              index = parseInt(transactionArr[i].purchase_date.substring(5,7).replace('-', '')) - 1;
              
              monthlySpendArr[index] += transactionArr[i].amount;

          }
          
          console.log(monthlySpendArr);
          var balance = 16000;
          for (var i =0; i<monthlyBalanceArr.length; i++)
          {
              monthlyBalanceArr[i] = balance - monthlySpendArr[i];
              balance = monthlyBalanceArr[i];
          }
          console.log(monthlyBalanceArr);



          var metaResultsFitness = [];
          var metaResultsTotalRewards = [];
          var metaResultsTotalInterest = [];
          var metaSignBonuses = [];


          //Customer (from fields on Site)
          var debt = 0; //Customer debt
          var income = 0; //Customer Income
          var pref = 1; //Preference for miles or cash back card, Yes = 1 No = 0.75
          var tempSpend = 0; //Placeholder spend value

          //Will calculate with each card info
          var totalRewards = 0; //Total Rewards
          var totalInterest = 0; //Total Interest
          var fitness = 0; //Direct Card compare

          var hasCapitalOne = true; //Boolean for if the customer has a Capital One Account
          var cardPref = "cash";

          if(!hasCapitalOne){
            var mSpend_fixed;

            if(income > 30000)
                mSpend_fixed = (income - (2000))/12;
            else
                mSpend_fixed = (income - (250))/12;

              for (var x = 0; x < 4; x++) {
                  /*Iterates through each card using the customer data and outputs the results in order
                   to a set of arrays */
                  for (var k = 0; k < creditCards.length; k++) {

                      var resultsFitness = [];
                      var resultsTotalRewards = [];
                      var resultsTotalInterest = [];
                      var resultsSignBonus = [];

                      var cashBack = creditCards[k]["cashBack"];
                      var yearFee = creditCards[k]["yearFee"];//Annual Fee
                      var interestRate = creditCards[k]["interestRate"] / 12; //Interest Rate by Month

                      var signBonus = creditCards[k]["signBonus"]; //Signup Bonus
                      var signUpLen = creditCards[k]["signUpLen"]; //Signup promo length
                      var promoLen = creditCards[k]["promoLen"]; //Promotional Interest Length
                      var tranFee = creditCards[k]["tranFee"]; //Transfer Fee Percentage
                      var introLen = creditCards[k]["introLen"]; //Transfer Introductory Interest Rate
                      var minSpend = creditCards[k]["minSpend"]; //Signup bonus minimum spend
                      var cardType = creditCards[k]["type"]; //The type of card Miles or Cash Back


                      console.log("Card: ", creditCards[k]["name"]);


                      var tSpend = mSpend_fixed * 12; //Sets tSpend to the total annual spend


                      var cMonth = new Date().getMonth(); //Current Month

                      //Fitness Calc

                      //Calculates the total cash back rewards
                      totalRewards = (tSpend * cashBack) - yearFee;
                      for (var j = 1; j <= signUpLen; j++) {
                          tempSpend += mSpend_fixed;
                      }
                      //If the minimum spend is cleared, do no change the Signup Bonus
                      //If not the bonus is set to zero
                      if (tempSpend < minSpend) signBonus = 0;
                      tempSpend = 0;
                      //for (var x = 0; x < 4; x++) {
                      //Calculates the interest paid on the monthly balance/cash flow
                      for (var i = 0; i < (12 - promoLen); i++) {
                          tempSpend += interestRate * mSpend_fixed * (x * 0.15);
                      }

                      //Total Interest Cost
                      totalInterest = (debt * tranFee) + tempSpend + (debt * interestRate * (12 - introLen));


                      /*
                       Total Rewards + Signup Bonus = Total Cash Benefit value for 1st Calendar year
                       Total Interest = Total Interest/Fee payement for 1st Calendar year
                       Fitness = In dollars the net cost/benefit for a card, this is what is directly compared between cards
                       */

                      //Calc pref value - weights the desired card type
                      if (cardPref !== cardType) {
                          pref = 0.75;
                      } else pref = 1;

                      fitness = (totalRewards + signBonus - totalInterest) * pref;

                      //Adds the fitness, Total Rewards, and Total Interest to individual arrays,
                      //in order by the original card order

                      resultsFitness.push(fitness);
                      console.log("fitness ", fitness);
                      resultsTotalRewards.push(totalRewards);
                      console.log("Total Rewards ", totalRewards);
                      resultsTotalInterest.push(totalInterest);
                      resultsSignBonus.push(signBonus);
                      console.log("sign bonus: ", signBonus);
                      console.log("interest ", -totalInterest);
                      console.log("Rate ", (x * 0.15), " \n");

                  }

                  metaResultsFitness.push(resultsFitness);
                  metaResultsTotalInterest.push(resultsTotalInterest);
                  metaResultsTotalRewards.push(resultsTotalRewards);
                  metaSignBonuses.push(resultsSignBonus);

              }

          } else {

              for (var x = 0; x < 4; x++) {
                  /*Iterates through each card using the customer data and outputs the results in order
                  to a set of arrays */
                  for (var k = 0; k < creditCards.length; k++) {

                      var resultsFitness = [];
                      var resultsTotalRewards = [];
                      var resultsTotalInterest = [];
                      var resultsSignBonus = [];

                      var cashBack = creditCards[k]["cashBack"];
                      var yearFee = creditCards[k]["yearFee"];//Annual Fee
                      var interestRate = creditCards[k]["interestRate"] / 12; //Interest Rate by Month

                      var signBonus = creditCards[k]["signBonus"]; //Signup Bonus
                      var signUpLen = creditCards[k]["signUpLen"]; //Signup promo length
                      var promoLen = creditCards[k]["promoLen"]; //Promotional Interest Length
                      var tranFee = creditCards[k]["tranFee"]; //Transfer Fee Percentage
                      var introLen = creditCards[k]["introLen"]; //Transfer Introductory Interest Rate
                      var minSpend = creditCards[k]["minSpend"]; //Signup bonus minimum spend
                      var cardType = creditCards[k]["type"]; //The type of card Miles or Cash Back

                      console.log("Card: ", creditCards[k]["name"]);

                      function mSpend(x) { //Monthly Spending calculator

                          return monthlySpendArr[x];
                      }

                      var tSpend = monthlySpendArr.reduce(function (a, b) {
                          return a + b;
                      }, 0); //Sets tSpend to the total annual spend


                      function mBalance(x) { //Monthly Account Balance

                          return monthlyBalanceArr[x];
                      }

                      var cMonth = new Date().getMonth(); //Current Month

                      //Fitness Calc

                      //Calculates the total cash back rewards
                      totalRewards = (tSpend * cashBack) - yearFee;
                      for (var j = 1; j <= signUpLen; j++) {
                          tempSpend += mSpend((cMonth - j) % 12);
                      }
                      //If the minimum spend is cleared, do no change the Signup Bonus
                      //If not the bonus is set to zero
                      if (tempSpend < minSpend) signBonus = 0;
                      tempSpend = 0;
                      //for (var x = 0; x < 4; x++) {
                      //Calculates the interest paid on the monthly balance/cash flow
                      for (var i = 0; i < (12 - promoLen); i++) {
                          tempSpend += interestRate * (mSpend((i + promoLen + cMonth) % 12)) * (x * 0.15);
                      }

                      //Total Interest Cost
                      totalInterest = (debt * tranFee) + tempSpend + (debt * interestRate * (12 - introLen));


                      /*
                      Total Rewards + Signup Bonus = Total Cash Benefit value for 1st Calendar year
                      Total Interest = Total Interest/Fee payement for 1st Calendar year
                      Fitness = In dollars the net cost/benefit for a card, this is what is directly compared between cards
                      */

                      //Calc pref value - weights the desired card type
                      if (cardPref !== cardType) {
                          pref = 0.75;
                      } else pref = 1;

                      fitness = (totalRewards + signBonus - totalInterest) * pref;

                      //Adds the fitness, Total Rewards, and Total Interest to individual arrays,
                      //in order by the original card order

                      resultsFitness.push(fitness);
                      console.log("fitness ", fitness);
                      resultsTotalRewards.push(totalRewards);
                      console.log("Total Rewards ", totalRewards);
                      resultsTotalInterest.push(totalInterest);
                      resultsSignBonus.push(signBonus);
                      console.log("sign bonus: ", signBonus);
                      console.log("interest ", totalInterest);
                      console.log("Rate ", (x * 0.15), " \n");

                  }

                  metaResultsFitness.push(resultsFitness);
                  metaResultsTotalInterest.push(resultsTotalInterest);
                  metaResultsTotalRewards.push(resultsTotalRewards);
                  metaSignBonuses.push(resultsSignBonus);

              }
              console.log(metaResultsTotalInterest);

              res.render('suggestion',
                  {
                      title: 'Card Suggestion',
                      email: req.query.email,
                      cashortravel: req.query.cashortravel,
                      fitnesses: metaResultsFitness,
                      totalRewards: metaResultsTotalRewards,
                      totalInterests: metaResultsTotalInterest,
                      signBonuses: metaSignBonuses,
                  });
          }

      });
    } else {

      /////////////

      res.render('suggestion', 
      { title: 'Card Suggestion', 
        income: req.query.income, 
        debt: req.query.debt, 
        loc: req.query.loc, 
        cashortravel: req.query.cashortravel,
        cost: req.query.cost
      });
    }
});

router.get('/cardBuilder', function(req, res, next){
  res.render('cardBuilder', { title: 'Build a Card' });
});

module.exports = router;