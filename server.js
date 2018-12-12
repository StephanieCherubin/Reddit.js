const path = require('path');
const express = require('express')
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./data/reddit-db.js');

require('dotenv').config({
  path: path.join(__dirname, '.env')
});

app.engine('handlebars', exphbs({
  extname: '.handlebars',
  layoutsDir: path.join(__dirname, 'views/layouts/'),
  partialsDir: path.join(__dirname, 'views/partials'),
  defaultLayout: 'main'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(cookieParser()); // Add this after you initialize express.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

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

const Posts = require('./controllers/posts.js')(app);
const Post = require('./models/post.js');
const Comments = require('./controllers/comments.js')(app);
const Auth = require('./controllers/auth.js')(app);
const User = require('./models/user');

//INDEX
// app.get('/', (req, res) => {
//   // var currentUser = req.user;
//   Post.find({})
//     .then((posts) => {
//       res.render('post-index.handlebars', { 'posts': posts, currentUser: req.user })
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

if (require.main === module) {
    let port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(new Date().toISOString() + `Reddit server started on port ${port}!`);
    });
}

module.exports = app;
module.exports.stop = () => {
    return db.close()
}
