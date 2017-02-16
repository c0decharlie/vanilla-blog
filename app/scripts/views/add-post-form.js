(function () {
    let addPostFormTemplate = require(__dirname + './../../templates/add-post-form.hbs');

    class AddPostForm {
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

                window.blog.runtime.emit('formSent', formDataObject);
            });
        }
    }

    window.blog.views.AddPostForm = AddPostForm;
}());
