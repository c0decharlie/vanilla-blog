import PostModel from '../models/post-model';
import PostListModel from '../models/post-list-model';
import CommentModel from '../models/comment-model';
import AddPostForm from '../views/add-post-form';
import PostView from '../views/post';
import PostComment from '../views/post-comment';

export default class BlogController {
    constructor() {
        this.postForm = new AddPostForm();
        this.postList = new PostListModel();
        this.eventListeners();
        this.onReady();
    }

    eventListeners() {
        window.runtime.on('formSent', (data) => {
            let post = new PostModel(data);
            this.postList.addPost(post);
            new PostView(post);
        });

        window.runtime.on('commentAdded', (data) => {
            let comment = new CommentModel(data);
            this.postList.addComment(comment);
            new PostComment(comment);
        });

        window.runtime.on('createdPostList', (posts) => {
            posts.forEach(post => {
                new PostView(post);
            });
        });

        window.runtime.on('createdCommentList', (comments) => {
            comments.forEach(comment => {
                new PostComment(comment);
            });
        });
    }

    onReady() {
        this.postList.checkPosts();
    }
}
