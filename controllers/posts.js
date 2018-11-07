// INDEX -- display a list of all posts
// NEW -- display a list of all posts
// CREATE -- create a new post



app.post('/posts/new', function(req,res) {
    console.log(req.user)
    var post = new Post(req.body);
    post.save( (err, post) => {
        if(err){console.log(err)};
        console.log(post);
    });
  });
};


// SHOW -- display a specific post

// EDIT -- edit a specific post
// UPDATE -- update a specific post
// DESTROY -- delete a specific post