(function () {
    let namespace = require('./namespace');
    let helpers = require('./utils/helpers');
    let localService = require('./services/local-service');
    let postModel = require('./models/post-model');
    let postListModel = require('./models/post-list-model');
    let commentModel = require('./models/comment-model');
    let addPostForm = require('./views/add-post-form');
    let postCommentForm = require('./views/post-comment-form');
    let post = require('./views/post');
    let comment = require('./views/post-comment');
    let blogController = require('./controllers/blog-controller');

    let scss = require('../styles/main.scss');

    new window.blog.controllers.BlogController();
}());
