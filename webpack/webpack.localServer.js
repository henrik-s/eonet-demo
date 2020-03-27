const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
    entry: path.resolve('server/index.ts'),
    output: {
        path: path.resolve('lib/'),
        filename: 'server.js',
    },
    context: path.resolve(__dirname, '../'),
    devtool: false,
    watch: true,
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'development',
    target: 'node',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [new NodemonPlugin()],
};
