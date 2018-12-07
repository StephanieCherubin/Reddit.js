const Post = require('../models/post');

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
}