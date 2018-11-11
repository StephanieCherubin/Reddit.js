const express = require('express')
const app = express();
const Posts = require('./controllers/posts.js')(app);
const Post = require('./models/post.js');
const Comments = require('./controllers/comments.js')(app);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {

  Post.find({}).then((posts) => {
    res.render('posts-index.handlebars', { posts })
  }).catch((err) => {
    console.log(err.message);
  })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
