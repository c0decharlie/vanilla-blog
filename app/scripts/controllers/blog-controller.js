(function () {
    let localService = window.blog.services.LocalService;
    let postModel = window.blog.models.PostModel;
    let postListModel = window.blog.models.PostListModel;
    let commentModel = window.blog.models.CommentModel;
    let addPostForm = window.blog.views.AddPostForm;
    let postView = window.blog.views.PostView;
    let postComment = window.blog.views.PostComment;

    class BlogController {
        constructor() {
            this.postForm = new addPostForm();
            this.postList = new postListModel();
            this.eventListeners();
            this.onReady();
        }

        eventListeners() {
            window.blog.runtime.on('formSent', (data) => {
                let post = new postModel(data);
                this.postList.addPost(post);
                new postView(post);
            });

            window.blog.runtime.on('commentAdded', (data) => {
                let comment = new commentModel(data);
                this.postList.addComment(comment);
                new postComment(comment);
            });

            window.blog.runtime.on('createdPostList', (posts) => {
                posts.forEach( post => {
                    new postView(post);
                });
            });

            window.blog.runtime.on('createdCommentList', (comments) => {
                comments.forEach( comment => {
                    new postComment(comment);
                });
            });
        }

        onReady() {
            this.postList.checkPosts();
        }
    }

    window.blog.controllers.BlogController = BlogController;
}());
