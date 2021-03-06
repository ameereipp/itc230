
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

app.use('/api', require('cors')()); //set Access-Control-Allow-Origin header for api route

app.get('/', (req,res) => {
  Game.find({}, (err, games) => {
    if(err) {
      console.log(err);
    }
      //}
      //else{
      // res.render('home', {games: games });
      console.log(games);
      res.render('home_dem', {games: JSON.stringify(games)});

  });
});

app.get('/api/details', (req, res, next)=>{
  Game.find({}, (err, games)=>{
    if(err) return next(err);
    res.json(games);
  });
});

// About - send plain text response
app.get('/about', (req,res) => {
  res.type('text/plain');
  res.send('About Page');

});

// ADD
// app.post('/add', (req,res, next) => {
//   const newGame = {gameName: req.body.gameName, type: req.body.type, level: req.body.level};
//   Game.updateOne({gameName: req.body.gameName}, newGame, {upsert: true}, (err, result)=>{
//     if(err) return next(err);
//     res.render('details', {result: newGame, action: 'added'});
//   });
// });
//add - api
// app.post('/api/add/:gameName', (req,res, next) => {
//   if (!req.body.gameName) { //insert new doc
//     let game = new Game({gameName: req.body.gameName, type: req.body.type, level: req.body.level});
//     game.save((err, newGame) => {
//       if (err) return next(err);
//       console.log(newGame)
//       res.json({updated: 0, gameName: newGame.gameName});
//     });
//   } else { //update existing game
//     Game.updateOne({gameName: req.body.gameName}, {
//       gameName: req.body.gameName,
//       type: req.body.type,
//       level: req.body.level
//     }, (err, result) => {
//       if (err) return next(err);
//       res.json({updated: result.nModified, gameName: req.body.gameName});
//     });
//   }
// });

app.post('/api/add/', (req,res, next) => {
  // find & update existing item, or add new
  if (!req.body._id) { // insert new document
    let game = new Game({gameName:req.body.gameName, type:req.body.type, level:req.body.level});
    game.save((err,newGame) => {
      if (err) return next(err);
      console.log(newGame);
      res.json({updated: 0, _id: newGame._id});
    });
  } else { // update existing document
    Game.updateOne({gameName: req.body.gameName}, {
      gameName: req.body.gameName,
      type: req.body.type,
      level: req.body.level
    }, (err, result) => {
      if (err) return next(err);
      res.json({updated: result.nModified, gameName: req.body.gameName});
      console.log(result);
    });
  }
});

// app.get('/api/add/:gameName/:type/:level', (req,res, next) => {
//   // find & update existing item, or add new
//   let gameName = req.params.gameName;
//   Game.update({ gameName: gameName}, {gameName:gameName, type: req.params.type, level: req.params.level },
//       {upsert: true }, (err, result) => {
//     if (err) return next(err);
//     // nModified = 0 for new item, = 1+ for updated item
//     res.json({updated: result.nModified});
//   });
// });


//DELETE - API
app.get('/api/delete/:id', (req,res, next) => {
  Game.deleteOne({ "_id": req.params.id }, (err, deleted) => {
    if (err) return next(err);
    res.json({"deleted": deleted});
    console.log(deleted);
  });
});

// SEARCH - handle POST (post renders body)
app.post('/details', (req, res, next) => {
  Game.findOne({gameName: req.body.gameName}, (err, game) => {
    if(err) return next(err);
    res.json(game);
  });
});
// SEARCH - API
app.get('/api/details/:gameName', (req, res, next) => {
  Game.findOne({ "_id": req.query.id }, (err, game) => {
    if (err) return next(err);
    res.render('details', {result: game} );
  });
});

//
// app.get('/details', (req, res, next) => {
//   Game.findOne({gameName: req.query.gameName}, (err, game) => {
//     if(err) return next(err);
//     res.render('details', {result: game});
//   });
// });



// define 404 handler
app.use((req,res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404--Not Found');

});

app.listen(app.get('port'),() => {
  console.log('Express started at ' + __dirname);

});


