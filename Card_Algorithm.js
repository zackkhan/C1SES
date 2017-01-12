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

//Customer
var debt = 0; //Customer debt
var income = 0; //Customer Income
var tempSpend = 0; //Placeholder spend value
var pref = 1; //Preference for miles or cash back card, Yes = 1 No = 0.75

function mSpend(x){ //Monthly Spending

    return x;
}

for (i = 0; i < 12; i++){
     tempSpend += mSpend(i);
}
var tSpend = tempSpend; tempSpend = 0; //Sets tSpend to the total annual spend

function mBalance(x){ //Monthly Account Balance

    return x;
}

totalRewards = 0; //Total Rewards
totalInterest = 0; //Total Interest
fitness = 0;

var cMonth =  new Date().getMonth(); //Current Month

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
