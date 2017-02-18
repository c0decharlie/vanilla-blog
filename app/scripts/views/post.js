import PostCommentForm from '../views/post-comment-form';
import postTemplate from './../../templates/post.hbs';

export default class PostView {
    constructor(data) {
        this.$postContainer = document.querySelector('#post-list');
        this.render(data, this.$postContainer);
    }

    render(data) {
        let compiledPostTemplate = postTemplate(data);
        let parser = new DOMParser();
        let $document = parser.parseFromString(compiledPostTemplate, 'text/html');
        let post = $document.querySelector('body').firstElementChild;
        this.$postContainer.appendChild(post);

        new PostCommentForm(post, data);
    }
}
