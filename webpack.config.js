const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: './scripts/main.js',
    output: {
        path: './scripts',
        filename: 'blog.js'
    },
    module: {

        loaders: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    }
};
