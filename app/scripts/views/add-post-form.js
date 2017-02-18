import addPostFormTemplate from './../../templates/add-post-form.hbs';

export default class AddPostForm {
    constructor() {
        this.$formWrapper = document.querySelector('#post-form');
        this.render();
    }

    render() {
        this.$formWrapper.innerHTML = addPostFormTemplate();
        this.formSubmitHandler();
    }

    formSubmitHandler() {
        this.$postForm = this.$formWrapper.querySelector('#post-form');
        this.$postForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let formData = new FormData(this.$postForm);
            let formDataObject = {};

            for (let [k,v] of formData) {
                formDataObject[k] = v;
            }

            window.runtime.emit('formSent', formDataObject);
        });
    }
}
