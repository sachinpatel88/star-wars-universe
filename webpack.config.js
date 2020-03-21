var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var path = require('path');

module.exports = {
    devServer: {
        historyApiFallback: true
    },
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [new UglifyJsPlugin()]
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'Star Wars Universe' }),
        new CleanWebpackPlugin(),
        new CopyPlugin([{ from: './resources', to: 'resources' }])
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader' // compiles Less to CSS
                    }
                ]
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader'
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: false
};
