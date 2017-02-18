import postCommentFormTemplate from './../../templates/add-comment-form.hbs';

export default class PostCommentForm {
    constructor(parent, data) {
        this.$formWrapper = parent.querySelector('.post-comments .add-comment');
        this.$commentWrapper = parent.querySelector('.post-comments .comments');
        this.postId = data.id;
        this.render();
    }

    render() {
        this.$formWrapper.innerHTML = postCommentFormTemplate();
        this.formSubmitHandler();
    }

    formSubmitHandler() {
        this.$commentForm = this.$formWrapper.querySelector('.comment-form');
        this.$commentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let formData = new FormData(this.$commentForm);
            let formDataObject = {};

            for (let [k,v] of formData) {
                formDataObject[k] = v;
            }

            formDataObject.postId = this.postId;

            window.runtime.emit('commentAdded', formDataObject);
        });
    }
}
