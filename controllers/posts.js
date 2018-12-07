const Post = require('../models/post');

module.exports = (app) => {

  // // SHOW -- display a specific post
  // app.get('/posts/:id', (req, res) => {
  //   var currentUser = req.user;

  // LOOK UP THE POST
  app.put("/posts/:id/vote-up", function(req, res) {
    Post.findById(req.params.id).exec(function(err, post) {
      post.upVotes.push(req.user._id);
      post.voteScore = post.voteTotal + 1;
      post.save();

      res.status(200);
    });
  });

  app.put("/posts/:id/vote-down", function(req, res) {
    Post.findById(req.params.id).exec(function(err, post) {
      post.downVotes.push(req.user._id);
      post.voteScore = post.voteTotal - 1;
      post.save();

      res.status(200);
    });
  });

  // NEW -- display a list of all posts
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
  app.post('/posts', (req, res) => {
      // Only allow logged in users to create posts
      if (req.user) {
          const post = new Post(req.body);
          post.author = req.user._id;
          post.save
              .then(post => {
                  return User.findById(req.user._id);
          })
          .then(user => {
              user.posts.unshift(post);
              user.save();
              // Redirect to the new post
              res.redirect('/posts/' + post._id);
          })
          .catch(err => {
              console.log(err.message);
          });
      } else {
          return res.status(401);
      }

  })
};