import localService from '../services/local-service';

export default class PostListModel {
    constructor() {
        this.posts = [];
    }

    addPost(post) {
        this.posts.push(post);
        this.savePosts();
    }

    removePost(post) {
        //TODO: usówanie postów z listy
    }

    savePosts() {
        localService.save(this.posts);
    }

    addComment(data) {
        let post = this.findPost(data.postId);
        post[0].comments.push(data);
        this.savePosts();
    }

    readPosts() {
        return localService.read();
    }

    checkPosts() {
        let postCollection = this.readPosts();

        if (postCollection) {
            this.posts = postCollection;
            window.runtime.emit('createdPostList', postCollection);
            this.checkComments();
        }
    }

    checkComments() {
        this.posts.forEach(element => {
            if (element.comments.length) {
                window.runtime.emit('createdCommentList', element.comments);
            }
        });
    }

    findPost(id) {
        return this.posts.filter(element => {
            if (element.id === id)
                return element;
        });
    }

}
