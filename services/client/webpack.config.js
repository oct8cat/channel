const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const extractCss = new ExtractTextWebpackPlugin('./css/[name].css')
const extractSass = new ExtractTextWebpackPlugin('./css/[name].css')

module.exports = {
    entry: {
        index: './src/index.js',
        vendors: [
            'react',
            'react-dom',
            'react-router',
            'react-mdl',
            'material',
            'material.css',
        ],
    },
    output: {
        filename: './js/[name].js',
    },
    module: {
        loaders: [
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            {test: /\.scss$/, use: extractSass.extract(['css-loader', 'sass-loader'])},
            {test: /\.css$/, use: extractSass.extract(['css-loader'])},
        ]
    },
    plugins: [
        extractSass,
        extractCss,
        new webpack.optimize.CommonsChunkPlugin('vendors'),
    ],
    resolve: {
        alias: {
            'material$': 'react-mdl/extra/material',
            'material.css$': 'react-mdl/extra/material.css',
        }
    }
}
