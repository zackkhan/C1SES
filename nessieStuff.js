var request = require('request');
var rp = require('request-promise');

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

 if (transactionArr[i].purchase_date.substring(5,7) == "01")
 {
  monthlySpendArr[0] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "02")
 {
  monthlySpendArr[1] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "03")
 {
  monthlySpendArr[2] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "04")
 {
  monthlySpendArr[3] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "05")
 {
  monthlySpendArr[4] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "06")
 {
  monthlySpendArr[5] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "07")
 {
  monthlySpendArr[6] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "08")
 {
  monthlySpendArr[7] += transactionArr[i].amount;
 }
 if (transactionArr[i].purchase_date.substring(5,7) == "09")
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
//Card

var cashBack = 0; //Card Cash Back
var yearFee = 0; //Annual Fee
var interestRate = 0; //Interest Rate
//Double check conversion/calculation for interest rate on a yearly vs. monthly scale
//Only used monthly calc here

var signBonus = 0; //Signup Bonus
var signUpLen = 0; //Signup promo length
var promoLen = 0; //Promotional Interest Length
var tranFee = 0; //Transfer Fee Percentage
var introLen = 0; //Transfer Introductory Interest Rate
var minSpend = 0; //Signup bonus minimum spend

//Customer (from fields on Site)
var debt = 0; //Customer debt
var income = 0; //Customer Income
var pref = 1; //Preference for miles or cash back card, Yes = 1 No = 0.75

var tempSpend = 0; //Placeholder spend value

function mSpend(x){ //Monthly Spending

    return monthlySpendArr[x-1];
}

var tSpend = monthlySpendArr.reduce(function(a, b) { return a + b; }, 0); //Sets tSpend to the total annual spend

function mBalance(x){ //Monthly Account Balance

    return monthlyBalanceArr[x-1];
}

var totalRewards = 0; //Total Rewards
var totalInterest = 0; //Total Interest
var fitness = 0;

var cMonth = new Date().getMonth(); //Current Month


//Fitness Calc

totalRewards = (tSpend * cashBack) - yearFee;
    for(var j=1; j <= signUpLen; j++) {
        tempSpend += mSpend((cMonth - j) % 12);
    }

if(tempSpend < minSpend) signBonus = 0;
    tempSpend = 0;

for(var i = 0; i <(12 - promoLen); i++) {
    tempSpend += interestRate * ((mBalance((i + promoLen + cMonth) % 12) + mSpend((i + promoLen + cMonth) % 12)) * .3);
}

totalInterest = (debt * tranFee) + tempSpend + (debt * interestRate * (12-introLen));


/*
 Total Rewards + Signup Bonus = Total Cash Benefit value for 1st Calendar year
 Total Interest = Total Interest/Fee payement for 1st Calendar year
 Fitness = In dollars the net cost/benefit for a card, this is what is directly compared between cards
 */
fitness = (totalRewards + signBonus + totalInterest) * pref;







});
