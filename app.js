var express = require('express');
var app = express();
var request = require('request');
var mysql = require('mysql');
var dateFormat = require('dateformat');

app.get('/', function (req, res) {
    res.send('You are ready to request.');
});
// On localhost:3000/welcome
app.get('/ping', function (req, res) {
    request({
        method: 'GET',
        uri: 'https://api.coingecko.com/api/v3/ping',
        headers: {"contentType": "application/json"}

    }, function (error, response, body){
        if(!error && response.statusCode == 200){
            var coins = JSON.parse(body);
            res.json(coins);
        }
    })
});

app.get('/coins/:count_per_page/:page_number', function (req, res) {
    request({
        method: 'GET',
        uri: 'https://api.coingecko.com/api/v3/coins?order=gecko_desc&per_page='+req.params.count_per_page+ '&page=' + req.params.page_number,
        headers: {"contentType": "application/json"}

    }, function (error, response, body){
        if(!error && response.statusCode == 200){
            var coins = JSON.parse(body);
            res.json(coins);
        }
    })
});

app.get('/exchange', function (req, res) {
    request({
        method: 'GET',
        uri: 'https://api.coingecko.com/api/v3/exchange_rates',
        headers: {"contentType": "application/json"}

    }, function (error, response, body){
        if(!error && response.statusCode == 200){
            var coins = JSON.parse(body);
            res.json(coins);
        }
    })
});
//https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd
app.get('/markets/:currency', function (req, res) {
    request({
        method: 'GET',
        uri: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + req.params.currency,
        headers: {"contentType": "application/json"}

    }, function (error, response, body){
        if(!error && response.statusCode == 200){
            var coins = JSON.parse(body);
            res.json(coins);
        }
    })
});

//https://api.coingecko.com/api/v3/coins/bitcoin
app.get('/:coin_id', function (req, res) {
    request({
        method: 'GET',
        uri: 'https://api.coingecko.com/api/v3/coins/' + req.params.coin_id,
        headers: {"contentType": "application/json"}

    }, function (error, response, body){
        if(!error && response.statusCode == 200){
            var coins = JSON.parse(body);
            res.json(coins);
        }
    })
});

//https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-12-2017
//:coin_id - bitcoin
//:date - 1d, 1w, 1m, 1y
app.get('/history/:coin_id/:date', function (req, res) {
    var date = req.params.date;
    console.log(date);
    var d_count = date.substring(0,date.length - 1);
    console.log(d_count);
    var last = date.substring(date.length - 1,date.length);
    console.log(last);
    var today = new Date();
    console.log(today);
    if(last.toLowerCase()=='d')
    {
        today.setDate(today.getDate() - d_count);

    }
    else if(last.toLowerCase()=='w')
    {
        today.setDate(today.getDate() - d_count*7);
    }
    else if(last.toLowerCase()=='m')
    {
        today.setMonth(today.getMonth() - d_count);
    }
    else if(last.toLowerCase()=='y')
    {
        today.setYear(today.getYear() - d_count);
    }
    else {
        res.send('invalid parameter!( 1d, 1w, 1m, 1y)!');
        return;
    }
    console.log(today);
    date=dateFormat(today, "dd-mm-yyyy");
    console.log(date);
    request({
        method: 'GET',
        uri: 'https://api.coingecko.com/api/v3/coins/' + req.params.coin_id + '/history?date=' + date,
        headers: {"contentType": "application/json"}

    }, function (error, response, body){
        if(!error && response.statusCode == 200){
            var coins = JSON.parse(body);
            res.json(coins);
        }
    })
});
//https://api.coingecko.com/api/v3/exchange_rates

app.get('/exchange', function (req, res) {
    request({
        method: 'GET',
        uri: 'https://api.coingecko.com/api/v3/exchange_rates',
        headers: {"contentType": "application/json"}

    }, function (error, response, body){
        if(!error && response.statusCode == 200){
            var coins = JSON.parse(body);
            res.json(coins);
        }
    })
});

//https://api.coingecko.com/api/v3/global


app.get('/global', function (req, res) {
    request({
        method: 'GET',
        uri: 'https://api.coingecko.com/api/v3/global',
        headers: {"contentType": "application/json"}

    }, function (error, response, body){
        if(!error && response.statusCode == 200){
            var coins = JSON.parse(body);
            res.json(coins);
        }
    })
});


app.get('/list', function (req, res) {
    var con = mysql.createConnection({
        host: "node-js.ca4faffwkqbi.us-east-2.rds.amazonaws.com",
        user: "root",
        password: "123456789",
        database: "node"
    });
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        con.query('SELECT * FROM `coinlist`', function(err, results) {
            if (err) throw err;
            res.json(results);
            con.end();
        });

    })
});
//:coin_id - bitcoin
//:date - 1d, 1w, 1m, 1y
app.get('/history/highlow/:coin_id/:date', function (req, res) {

    var date = req.params.date;
    console.log(date);
    var d_count = date.substring(0,date.length - 1);
    console.log(d_count);
    var last = date.substring(date.length - 1,date.length);
    console.log(last);
    var today = new Date();
    console.log(today);
    if(last.toLowerCase()=='d')
    {
        today.setDate(today.getDate() - d_count);

    }
    else if(last.toLowerCase()=='w')
    {
        today.setDate(today.getDate() - d_count*7);
    }
    else if(last.toLowerCase()=='m')
    {
        today.setMonth(today.getMonth() - d_count);
    }
    else if(last.toLowerCase()=='y')
    {
        today.setYear(today.getYear() - d_count);
    }
    else {
        res.send('invalid parameter!( 1d, 1w, 1m, 1y)!');
        return;
    }
    console.log(today);
    date = dateFormat(today, "yyyy-mm-dd");

    var coin_id = req.params.coin_id;


    var con = mysql.createConnection({
        host: "node-js.ca4faffwkqbi.us-east-2.rds.amazonaws.com",
        user: "root",
        password: "123456789",
        database: "node"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("select * from `coins` where `last_date`='" + date + "' and `coins`='" + coin_id + "'", function (err, result) {
            if (err) throw err;
            res.json(result);

            con.end();
        });
    });




});




// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).send("Sorry, there is no any service like. Please try again :)");
});

// start the server in the port 3000 !
app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});

