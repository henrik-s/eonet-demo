const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve('src/index.tsx'),
    context: path.resolve(__dirname, '../'),
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[local]_[hash:base64:5]',
                            },
                        },
                    },
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve('src/assets/**/*.sass'),
                        },
                    },
                ],
            },
        ],
    },
    mode: 'development',
    devServer: {
        port: 9000,
        hot: true,
        serveIndex: false,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    resolve: {
        alias: {
            '@': path.resolve('src/'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'EONET demo',
        }),
    ],
};
