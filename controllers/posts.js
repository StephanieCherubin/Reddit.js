require('./controllers/posts.js')(app);
const Post = require('../models/post');

const bodyParser = require('body-parser');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); // Add after body parser initialization!

// INDEX -- display a list of all posts
// NEW -- display a list of all posts
// CREATE -- create a new post


module.exports = (app) => {

  // CREATE
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });

};


// SHOW -- display a specific post

// EDIT -- edit a specific post
// UPDATE -- update a specific post
// DESTROY -- delete a specific post