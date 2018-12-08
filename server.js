const path = require('path');
const express = require('express')
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config({
  path: path.join(__dirname, '.env')
});

app.engine('handlebars', exphbs({
  extname: '.handlebars',
  layoutsDir: path.join(__dirname, 'views/layouts/'),
  partialsDir: path.join(__dirname, 'views/partials'),
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(cookieParser()); // Add this after you initialize express.

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next();
};
app.use(checkAuth);
const db = require('./data/reddit-db.js');

const Posts = require('./controllers/posts.js')(app);
const Post = require('./models/post.js');
const Comments = require('./controllers/comments.js')(app);
const Auth = require('./controllers/auth.js')(app);
const User = require('./models/user');

//INDEX
app.get('/', (req, res) => {
  var currentUser = req.user;
  Post.find({})
    .then((posts) => {
      res.render('post-index.handlebars', { 'posts': posts, 'currentUser': currentUser })
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.listen(3000, function() {
    console.log(new Date().toISOString() + ": Reddit Server started on port 3000");
});
