var Post = require('../models/post');

// INDEX -- display a list of all posts
// NEW -- display a list of all posts
// CREATE -- create a new post


module.exports = (app) => {

  // SUBREDDIT
  app.get("/n/:subreddit", function(req, res) {
    var currentUser = req.user;

    Post.find({ subreddit: req.params.subreddit })
      .then(posts => {
        res.render("posts-index.handlebars", { posts, currentUser });
      })
      .catch(err => {
        console.log(err);
      });
  });

  // SHOW -- display a specific post
  app.get('/posts/:id', (req, res) => {
    var currentUser = req.user;

  // LOOK UP THE POST
  Post.findById(req.params.id).populate('comments').then((post) => {
    res.render('post-show.handlebars', { post })
  }).catch((err) => {
    console.log(err.message)
  });
})


  // CREATE
  app.post('/posts/new', function (req, res){
    // INSTANTIATE INSTANCE OF POST MODEL
    console.log(req.user);
    var post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    });
  });

  // CREATE
  app.post("/posts", (req, res) => {
    if (req.user) {
      var post = new Post(req.body);

      post.save(function(err, post) {
        return res.redirect(`/`);
      });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });
};