Reddit.js
a clone of Reddit with posts, subreddits, and authentication

## Technologies Used
- Node.js

## To Do:
1. [ ] Complete `CRUD` of Subreddits
	1. [ ] `index` *View* a list of all subreddits
	1. [ ] `new` *View* subreddit creation page
	1. [ ] `create` *Actionably* create a subreddit
	1. [ ] `show` *View* a single subreddit in detail
	1. [ ] `edit` *View* subreddit update-content page
	1. [ ] `update` *Actionably* update a subreddit
	1. [ ] `destroy` *Actionably* delete a subreddit
1. [ ] Complete `CRUD` of Posts
	1. [ ] `index` *View* a list of all posts (on current `show` subreddit)
	1. [ ] `new` *View* post creation page
	1. [ ] `create` *Actionably* create a post
	1. [ ] `show` *View* a single post in detail
	1. [ ] `edit` *View* post update-content page
	1. [ ] `update` *Actionably* update a post
	1. [ ] `destroy` *Actionably* delete a post
1. [ ] Complete `CRUD` of Comments
	1. [ ] `index` *View* a list of all comments (on current `show` post)
	1. [ ] `new` *View* comment creation box (on current `show` post)
	1. [ ] `create` *Actionably* create a comment (on current `show` post)
	1. [ ] ~~`show` *View* a single comment in detail~~ (**stretch goal**)
	1. [ ] `edit` *View* comment update-content box (on current `show` post)
	1. [ ] `update` *Actionably* update a comment (on current `show` post)
	1. [ ] `destroy` *Actionably* delete a comment (on current `show` post)
1. [ ] Connect posts and subreddits
	- Each subreddit has one parent document
	- Each subreddit has many posts
	- Each post has one subreddit
	- Each post has many comments
	- Each comment has one post
	- Each comment has many comments. (**∞ stretch goal**)
1. [ ] Sign Up & Log In
	- Need more information on Sign Up & Log In
1. [ ] Associate posts, comments, and votes with their author
	- Each author has many comments
	- Each comment has one author
	- Each author has many posts
	- Each post has one author
1. [ ] `update` Vote a post up or down
1. [ ] `update` Vote a comment up or down
1. [ ] Search Functionality
