var utils = require('./../utils/utils');
var accounts = require('./../accounts');
var fs = require('fs');

var authenticate = function (req, res) {
   var cardNumber = req.body.userName
   var pinCode = req.body.password
   var accountIndex= accounts.findIndex(function(acc){
        if(acc.cardNumber===cardNumber && acc.pinCode===pinCode){
            return acc;
        }
    })

    if (accountIndex!==-1) {
        var token = utils.CreateJWT(accounts[accountIndex]);
        res.send({ token: token });
    } else {
         res.status(500).end('Invalid card number or pin code');
    }
}

var getUserDetails=function(req,res){
    res.json(req.user);
}
module.exports = function (app) {
    app.post('/api/auth/Authenticate', authenticate);
    app.get('/api/ATM/GetUserDetails',utils.EnsureAuthenticated, getUserDetails);
}
