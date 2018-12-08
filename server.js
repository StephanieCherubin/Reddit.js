const express = require('express')

require('dotenv').config();

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var exphbs = require('express-handlebars');
app.use(cookieParser()); // Add this after you initialize express.

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));


var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  console.log("authentication finished")
  next();
};
app.use(checkAuth);

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
