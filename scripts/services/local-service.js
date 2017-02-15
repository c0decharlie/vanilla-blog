(function () {
    class LocalService {
        static save(data) {
            let formattedData = JSON.stringify(data);
            localStorage.setItem('blog', formattedData);
        }

        static read() {
            let stringifiedData = localStorage.getItem('blog');

            if (typeof stringifiedData === 'string')
                return JSON.parse(stringifiedData);
        }
    }

    window.blog.services.LocalService = LocalService;
}());
