'use strict'
const express = require("express");
const bodyParser = require("body-parser")
const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");

// send static file as response
// app.get('/', (req, res) => {
//   console.log(reg.query)
//  res.type('text/html');
//  res.sendFile(__dirname + '/public/home.html'); 
// });

app.get('/', (req, res) => {
res.render('home')
});

// send plain text response
app.get('/about', (req, res) => {
 res.type('text/plain');
 res.send('About page');
});

// handle form submission
app.get('/about', (req, res) => {
console.log(req.body.username)
res.type('text/plain')
res.send('Detail page')

})