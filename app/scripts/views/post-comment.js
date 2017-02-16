(function () {
    let commentTemplate = require(__dirname + '../../templates/comment.hbs');

    class PostComment {
        constructor(data) {
            this.$commentWrapper = document.querySelector('#post-' + data.postId + ' .post-comments .comments');
            this.render(data);
        }

        render(data) {
            let compiledCommentTemplate = commentTemplate(data);
            let parser = new DOMParser();
            let $document = parser.parseFromString(compiledCommentTemplate, 'text/html');
            let comment = $document.querySelector('body').firstElementChild;

            this.$commentWrapper.appendChild(comment);
        }
     }

     window.blog.views.PostComment = PostComment;
}());
