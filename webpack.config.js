var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var path = require('path');

module.exports = {
    devServer: {
        historyApiFallback: {
            index: 'build/index.html'
        }
    },
    entry: './src/index.js',
    output: {
        publicPath: '/',
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
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            GRAPHQL_SERVER_URL: JSON.stringify(
                process.env.GRAPHQL_SERVER_URL || 'http://localhost:4000/'
            )
        }),
        new HtmlWebpackPlugin({ title: 'Star Wars Universe' }),
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
    devtool: 'inline-source-map'
};
