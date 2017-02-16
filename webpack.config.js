const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: './app/scripts/main.js',
    output: {
        path: './app/scripts',
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
