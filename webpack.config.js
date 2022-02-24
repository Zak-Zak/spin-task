const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    mode: NODE_ENV || 'development',
    entry: path.resolve(__dirname, './src/index.ts'),
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        new NodePolyfillPlugin(),
    ],
    devServer: {
        port: 3000,
        open: true,
        hot: true,
    },
};