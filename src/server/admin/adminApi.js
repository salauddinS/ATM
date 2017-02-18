var utils = require('./../utils/utils');
var accounts = require('./../accounts');

var getAccountList = function (req, res) {
    res.json(accounts);
}

var saveAccount = function (req, res) {
    var account = req.body;
    accounts.push(account)
    res.send();
}
var editAccount = function (req, res) {
    var account = req.body;
    var index = accounts.findIndex(function (acc) {
        if (acc.cardNumber === account.cardNumber) {
            return acc;
        }
    })
    accounts[index] = account;
    res.send();
}
var deleteAccount = function (req, res) {
    var account = req.body;
    var index = accounts.findIndex(function (acc) {
        if (acc.cardNumber === account.cardNumber) {
            return acc;
        }
    })
    accounts.splice(index, 1)
    res.json(accounts);
}
module.exports = function (app) {
    app.post('/api/Admin/SaveAccount', utils.EnsureAuthenticated, saveAccount);
    app.post('/api/Admin/EditAccount', utils.EnsureAuthenticated, editAccount);
    app.get('/api/Admin/GetAccountList', utils.EnsureAuthenticated, getAccountList);
    app.post('/api/Admin/DeleteAccount', utils.EnsureAuthenticated, deleteAccount);
}