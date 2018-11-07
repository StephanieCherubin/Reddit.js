require('./controllers/posts.js')(app);

const bodyParser = require('body-parser');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); // Add after body parser initialization!

// INDEX -- display a list of all posts
// NEW -- display a list of all posts
// CREATE -- create a new post



module.exports = app => {
  // CREATE
  app.post("/posts/new", (req, res) => {
    console.log(req.body);
  });
};


// SHOW -- display a specific post

// EDIT -- edit a specific post
// UPDATE -- update a specific post
// DESTROY -- delete a specific post