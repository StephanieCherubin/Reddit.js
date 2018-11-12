const Post = require('../models/post');

// const bodyParser = require('body-parser');

// Use Body Parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(expressValidator()); // Add after body parser initialization!

// INDEX -- display a list of all posts
// NEW -- display a list of all posts
// CREATE -- create a new post


module.exports = (app) => {

  // SUBREDDIT
  app.get("/n/:subreddit", function(req, res) {
    Post.find({ subreddit: req.params.subreddit })
      .then(posts => {
        res.render("posts-index.handlebars", { posts });
      })
      .catch(err => {
        console.log(err);
      });
  });

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

  // LOOK UP THE POST
  Post.findById(req.params.id).populate('comments').then((post) => {
    res.render('post-show.handlebars', { post })
  }).catch((err) => {
    console.log(err.message)
  });
  });

};


// SHOW -- display a specific post

// EDIT -- edit a specific post
// UPDATE -- update a specific post
// DESTROY -- delete a specific post