var request = require('request');
var rp = require('request-promise');

/* Legacy Object
var creditCard = function creditCard(cashBackRate, annualFee, interestRate, signUpBonusVal, interestPromoLength,
transferFee, transferIntroLength, bonusMinSpend) {
  this.cashBackRate = cashBackRate;
  this.annualFee = annualFee;
  this.interestRate = interestRate;
  this.signUpBonusVal = signUpBonusVal;
  this.interestPromoLength = interestPromoLength;
  this.transferFee = transferFee;
  this.transferIntroLength = transferIntroLength;
  this.bonusMinSpend = bonusMinSpend;
}
*/


//var Customer = function Customer(Debt, totalSpend, monthlySpend, monthlyBalance, totalRewards, totalInterest)
//{};
rp('http://api.reimaginebanking.com/accounts/5877e7481756fc834d8eace6/purchases?key=b86dd9297128e1a6a6b8e0821692d691').then(function(response){


console.log(typeof(response));

var transactionArr = JSON.parse(response);
var amountArr = [];
var dateArr = [];
var monthlySpendArr = [0,0,0,0,0,0,0,0,0,0,0,0,0];
var monthlyBalanceArr = [0,0,0,0,0,0,0,0,0,0,0,0,0];
console.log(typeof(transactionArr));
console.log(transactionArr.length);

for (var i=0; i<transactionArr.length; i++)
{
//  var s;
  //var month = transactionArr[i].purchase_date.substring(5,7);
amountArr.push(transactionArr[i].amount);
 dateArr.push(transactionArr[i].purchase_date);

console.log(transactionArr[i].purchase_date.substring(5,7) )

 if (transactionArr[i].purchase_date.substring(5,7) == "1-")
 {
  monthlySpendArr[0] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "2-")
 {
  monthlySpendArr[1] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "3-")
 {
  monthlySpendArr[2] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "4-")
 {
  monthlySpendArr[3] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "5-")
 {
  monthlySpendArr[4] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "6-")
 {
  monthlySpendArr[5] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "7-")
 {
  monthlySpendArr[6] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "8-")
 {
  monthlySpendArr[7] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "9-")
 {
  monthlySpendArr[8] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "10")
 {
  monthlySpendArr[9] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "11")
 {
  monthlySpendArr[10] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "12")
 {
  monthlySpendArr[11] += transactionArr[i].amount;
 }
 //balance stuff
}
console.log(monthlySpendArr);
var balance = 16000;
for (var i =0; i<monthlyBalanceArr.length; i++)
{
 monthlyBalanceArr[i] = balance - monthlySpendArr[i];
 balance = monthlyBalanceArr[i];
}
console.log(monthlyBalanceArr);

/**
 * Created by Maxwell Heller
 * For Capital One Software Engineering Summit
 * Calculates the Total Benefit/Cost (in dollars) for various Capital One Credit Cards
 */

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
        minSpend: 500
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
        minSpend: 500
    },
    {
        name: "VentureOne Rewards",
        cashBack: 0.0125,
        yearFee: 0, //Annual Fee
        interestRate: 0.2249, //Interest Rate
        signBonus: 2000, //Signup Bonus
        signUpLen: 3, //Signup promo length
        promoLen: 12, //Promotional Interest Length
        tranFee: 0, //Transfer Fee Percentage
        introLen: 0, //Transfer Introductory Interest Rate
        minSpend: 1000
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
        minSpend: 0
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
        minSpend: 0
    }
];
var resultsFitness = [0,0,0,0,0];
var resultsTotalRewards = [0,0,0,0,0];
var resultsTotalInterest = [0,0,0,0,0];

//Customer (from fields on Site)
    var debt = 0; //Customer debt
    var income = 0; //Customer Income
    var pref = 1; //Preference for miles or cash back card, Yes = 1 No = 0.75
    var tempSpend = 0; //Placeholder spend value

    //Will calculate with each card info
    var totalRewards = 0; //Total Rewards
    var totalInterest = 0; //Total Interest
    var fitness = 0; //Direct Card compare

/*Iterates through each card using the customer data and outputs the results in order
  to a set of arrays    */
for(var k = 0; k < creditCards.length; k++){

    var cashBack = creditCards[k]["cashBack"];
    var yearFee = creditCards[k]["yearFee"];//Annual Fee
    var interestRate = creditCards[k]["interestRate"]/12; //Interest Rate by Month


    var signBonus = creditCards[k]["signBonus"]; //Signup Bonus
    var signUpLen = creditCards[k]["signUpLen"]; //Signup promo length
    var promoLen = creditCards[k]["promoLen"]; //Promotional Interest Length
    var tranFee = creditCards[k]["tranFree"]; //Transfer Fee Percentage
    var introLen = creditCards[k]["introLen"]; //Transfer Introductory Interest Rate
    var minSpend = creditCards[k]["minSpend"]; //Signup bonus minimum spend


    function mSpend(x){ //Monthly Spending calculator

        return monthlySpendArr[x-1];
    }

    var tSpend = monthlySpendArr.reduce(function(a, b) { return a + b; }, 0); //Sets tSpend to the total annual spend

    function mBalance(x){ //Monthly Account Balance

        return monthlyBalanceArr[x-1];
    }

    var cMonth = new Date().getMonth(); //Current Month


    //Fitness Calc

    //Calculates the total cash back rewards
    totalRewards = (tSpend * cashBack) - yearFee;
    for(var j=1; j <= signUpLen; j++) {
        tempSpend += mSpend((cMonth - j) % 12);
    }
    //If the minimum spend is cleared, do no change the Signup Bonus
    //If not the bonus is set to zero
    if(tempSpend < minSpend) signBonus = 0;
    tempSpend = 0;

    //Calculates the interest paid on the monthly balance/cash flow
    for(var i = 0; i <(12 - promoLen); i++) {
        tempSpend += interestRate * ((mBalance((i + promoLen + cMonth) % 12) + mSpend((i + promoLen + cMonth) % 12)) * .3);
    }

    //Total Interest Cost
    totalInterest = (debt * tranFee) + tempSpend + (debt * interestRate * (12-introLen));


    /*
     Total Rewards + Signup Bonus = Total Cash Benefit value for 1st Calendar year
     Total Interest = Total Interest/Fee payement for 1st Calendar year
     Fitness = In dollars the net cost/benefit for a card, this is what is directly compared between cards
     */

    fitness = (totalRewards + signBonus + totalInterest) * pref;

    //Adds the fitness, Total Rewards, and Total Interest to individual arrays,
    //in order by the original card order
    resultsFitness[k] = fitness;
    resultsTotalRewards[k] = totalRewards;
    resultsTotalInterest[k] = totalInterest;
    }



});
