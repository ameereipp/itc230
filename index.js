'use strict'

const Game = require('./models/game.js');

const express = require("express");
const bodyParser = require("body-parser")
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

const handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");

app.get('/', (req,res) => {
  Game.find({}, (err, games) => {
    if(err) {
      console.log(err);
    }else{
      res.render('home', {games: games });
    }
  });
});

// send content of 'home' view
/*app.get('/', (req,res) => {
  res.render('home', {game: game.getAll()});
});*/

// About - send plain text response
app.get('/about', (req,res) => {
  res.type('text/plain');
  res.send('About Page');

});

// ADD
app.get('/details', (req,res, next) => {
  Game.findOne({gameName: req.query.gameName}, (err, game)=>{
    if(err) return next(err);
    res.render('details', {result: game});
  });
});

// DELETE - handle GET (get renders query)
/*app.get('/delete', (req,res) => {
  console.log(req.query.gameName + ' deleted');
  let result = game.delete(req.query.gameName); //delete game object
  res.render('delete', {gameName: req.query.gameName, result: result});

});*/

// SEARCH - handle POST (post renders body)
app.post('/details', (req, res, next) => {
  console.log(req.body);
  Game.findOne({gameName: req.body.gameName}, (err, game) => {
    if(err) return next(err);
    res.render('details', {result: game});
  });
});

// define 404 handler
app.use((req,res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404--Not Found');

});

app.listen(app.get('port'),() => {
  console.log('Express started at ' + __dirname);

});