(function () {
    let helpers = new window.blog.utils.Helpers();

    class CommentModel {
        constructor(data) {
            this.author = data.author;
            this.content = data.content;
            this.postId = data.postId;
            this.date = helpers.getCurrentDate();
            this.id = helpers.generateId();
        }
    }

    window.blog.models.CommentModel = CommentModel;
}());
