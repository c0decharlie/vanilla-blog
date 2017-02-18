import helpers from '../utils/helpers'

export default class CommentModel {
    constructor(data) {
        this.author = data.author;
        this.content = data.content;
        this.postId = data.postId;
        this.date = helpers.getCurrentDate();
        this.id = helpers.generateId();
    }
}
