var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require("./models");
var Post = db.Post;
var User = db.User;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = {
  APPLICATION_ID: process.env.APPLICATION_ID || '22894',
  SECRET: process.env.SECRET || '77a3c692003ea8fe6fc3a69c14ec944a491157afa58e77137a6c8896df54214a',
  CALLBACK_URL: process.env.CALLBACK_URL || 'urn:ietf:wg:oauth:2.0:oob'
};
// Configure app
app.use(express.static(__dirname + '/views'));    // Views directory
app.use(express.static('public'));          // Static directory
app.use(bodyParser.urlencoded({ extended: true })); // req.body
app.set('view engine', 'ejs')

// Middleware for auth
app.use(cookieParser());
app.use(session({
  secret: 'techbae', // changed secret key!
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport Config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set CORS Headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//routes

//show index page
app.get('/', function(req, res) {
 res.render("index", { user: req.user, });
});

// auth routes

// show signup view
app.get('/signup', function (req, res) {
  res.render('signup');
});

// sign up new user, then log them in
// hashes and salts password, saves new user to db
app.post('/signup', function (req, res) {
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      if (err){
        console.log(err)
      } else {
        passport.authenticate('local')(req, res, function() {
          res.redirect('/');
        })
    }

  });
});

app.get('/map', function (req, res) {
 res.render('map');
});

// show login view
app.get('/login', function (req, res) {
 res.render('login');
});

// log in user
app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log(req.user);
  res.redirect('/'); // sanity check
  // res.redirect('/'); // preferred!
});

// log out user
app.get('/logout', function (req, res) {
  console.log("BEFORE logout", JSON.stringify(req.user));
  req.logout();
  console.log("AFTER logout", JSON.stringify(req.user));
  res.redirect('/');
});

app.post('/api/landmark', function (req, res) {
  // create new book with form data (`req.body`)
  var newFav = new db.Landmark({
    name: req.body.address
  });
})
//uppercase PORT means it is global, if not available, it will use 5000
app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening at http://localhost:5000/');
});
