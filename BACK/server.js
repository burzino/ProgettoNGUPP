
var fs = require('fs');
var http = require('http');
var url = require('url');
var mongo = require('mongodb');


const { MongoClient, ServerApiVersion } = require('mongodb');
const { Client } = require('pg')
const express = require('express')
const app = express()
const port = process.env.PORT || 80
var dbo;

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:4200');
    res.header("Access-Control-Allow-Origin", req.header('Origin'));

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});





const uri = "mongodb+srv://andrearacca270:Ngupp2022@cluster0.2tb0gsv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(
    uri, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        serverApi: ServerApiVersion.v1 
    });


/*
MongoClient.connect(url, function(err, db) {

    var cursor = db.collection('sentenza').find();

    cursor.each(function(err, doc) {

        console.log(doc);

    });
});*/
/*
client.connect(function (err, db) {
    if (err) throw err;
    dbo = db.db("indiceSentenzeDB");
    console.log("Connected!");
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
*/
app.get('/', (req, res) => {
    res.send('Server ready to serve')
});







app.route('/Employeeid').get(function(req, res)
    {
        MongoClient.connect(url, function(err, db) {
            var cursor = db.collection('indiceSentenzeDB.sentenza').find();
            //noinspection JSDeprecatedSymbols
            cursor.each(function(err, item) {
/*
                if (item != null) {
                    str = str + "    Employee id  " + item.Employeeid + "</br>";
                }*/
            });
            res.send(str);
            db.close();
        });
    });

var server = app.listen(port, function() {}); 