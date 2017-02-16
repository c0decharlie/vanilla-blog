(function () {
    let postTemplate = require(__dirname + './../../templates/post.hbs');
    let postCommentForm = window.blog.views.PostCommentForm;

    class PostView {
        constructor(data) {
            this.$postContainer = document.querySelector('#post-list');
            this.render(data, this.$postContainer);
            console.log('post data ', data);
        }

        render(data) {
            let compiledPostTemplate = postTemplate(data);
            let parser = new DOMParser();
            let $document = parser.parseFromString(compiledPostTemplate, 'text/html');
            let post = $document.querySelector('body').firstElementChild;
            this.$postContainer.appendChild(post);

            new postCommentForm(post, data);
        }
    }

    window.blog.views.PostView = PostView;
}());
