import helpers from '../utils/helpers';

export default class PostModel {
    constructor(data) {
        this.title = data.title;
        this.author = data.author;
        this.content = data.content;
        this.date = helpers.getCurrentDate();
        this.id = helpers.generateId();
        this.comments = [];
    }
}
