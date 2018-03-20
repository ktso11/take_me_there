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
app.set("views", __dirname + '/views');    // Views directory
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
          res.redirect('/map');
        })
    }

  });
});

app.get('/map', function (req, res) {
 res.render('map', {user: req.user});
});

// show login view
app.get('/login', function (req, res) {
 res.render('login');
});

app.get('/profile', function (req, res) {
 res.render('profile');
});

// log in user
app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log(req.user);
  res.redirect('/map'); // sanity check
  // res.redirect('/'); // preferred!
});

// log out user
app.get('/logout', function (req, res) {
  console.log("BEFORE logout", JSON.stringify(req.user));
  req.logout();
  console.log("AFTER logout", JSON.stringify(req.user));
  res.redirect('/');
});

app.post('/api/landmarks', function (req, res) {
  // create new landmark with form data (`req.body`)
  var newFav = new db.Landmark(req.body);
  newFav.save(function(err, savedTodo){
    if(err){res.status(500).json({"ERR": err});}
    console.log(savedTodo);
    res.status(200).json(savedTodo);
  });
})

app.get('/api/landmarks', function(req, res) {
    db.Landmark.find({}, function(err, allLandmarks) {
        res.json({ fav_places: allLandmarks });
    });
});



// app.get('/api/landmarks', function (req, res) {
//     // .exec(function(err, landmarks) {
//       // if (err) { return console.log("index error: " + err); }
//       res.json(landmarks);
//   // });
// });
//uppercase PORT means it is global, if not available, it will use 5000
app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening at http://localhost:5000/');
});
