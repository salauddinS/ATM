var utils = require('./../utils/utils');
var accounts = require('./../accounts');

var getAccountList = function (req, res) {
    res.json(accounts);
}

var saveAccount = function (req, res) {
    var account = req.body;
    account.id = accounts[accounts.length-1].id + 1
    accounts.push(account)
    res.send();
}
var editAccount = function (req, res) {
    var account = req.body;
    var index = accounts.findIndex(function (acc) {
        if (acc.id === account.id) {
            return acc;
        }
    })
    accounts[index] = account;
    res.send();
}
var deleteAccount = function (req, res) {
    var account = req.body;
    var index = accounts.findIndex(function (acc) {
        if (acc.id === account.id) {
            return acc;
        }
    })
    accounts.splice(index, 1)
    res.json(accounts);
}

var authenticate = function (req, res) {
    var cardNumber = req.body.userName
    var pinCode = req.body.password
    var accountIndex = accounts.findIndex(function (acc) {
        if (req.body.userName === 'admin' && req.body.password === 'admin') {
            return acc;
        }
    })

    if (accountIndex !== -1) {
        var token = utils.CreateJWT(accounts[accountIndex]);
        res.send({ token: token });
    } else {
        res.status(500).end('Invalid User Name or Password');
    }
}
module.exports = function (app) {
    app.post('/api/Admin/SaveAccount', utils.EnsureAuthenticated, saveAccount);
    app.post('/api/Admin/EditAccount', utils.EnsureAuthenticated, editAccount);
    app.get('/api/Admin/GetAccountList', utils.EnsureAuthenticated, getAccountList);
    app.post('/api/Admin/DeleteAccount', utils.EnsureAuthenticated, deleteAccount);
    app.post('/api/Admin/Authenticate', authenticate);
}