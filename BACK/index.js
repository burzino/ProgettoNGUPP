const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient

var db;
const uri = "mongodb+srv://andrearacca270:Ngupp2022@cluster0.2tb0gsv.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.PORT || 80


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

app.listen(port, function() {
    console.log('listening on '+ port);
    MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(client => {
      console.log('Connected to Database')
      db = client.db('indiceSentenzeDB')
    })
  })

app.get('/', function (req, res) {
    res.send('Server ready to serve')
  })

  app.get('/getOne', (req, res) => {
    const cursor = db.collection('sentenza').find().toArray()
    .then(results => {
        res.send(results)
    })
    .catch(error => console.error(error))

  })

  app.get('/getByVoce', (req, res) => {
    let nomeVoce = req.query.voce
    console.log(nomeVoce)
    const cursor = db.collection('sentenza').find({voce: {$regex : nomeVoce}}).toArray()
    .then(results => {
        res.send(results)
    })
    .catch(error => console.error(error))

  })

  
  app.get('/getBySubText', (req, res) => {
    let subText = req.query.subText
    let nomeVoce = req.query.voce
    if (nomeVoce=='tutte le voci'){
      console.log(subText)
      const cursor = db.collection('sentenza').find({sentenza: {$regex : subText}}).toArray()
      .then(results => {
          res.send(results)
      })
      .catch(error => console.error(error))
    }
    else{
      console.log(subText)
      const cursor = db.collection('sentenza').find({voce: nomeVoce,sentenza: {$regex : subText}}).toArray()
      .then(results => {
          res.send(results)
      })
      .catch(error => console.error(error))
    }

  })

  app.get('/getAllVoci', (req, res) => {
    const cursor = db.collection('sentenza').find({}).toArray()
    .then(results => {
        res.send(results)
    })
    .catch(error => console.error(error))
  })