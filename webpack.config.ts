import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
import 'webpack-dev-server';

const config: webpack.Configuration = {
    target: 'web',
    mode: 'development',
    entry: './src/index.ts',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle[fullhash].js',
    },
    devServer: {
        host: '0.0.0.0',
        allowedHosts: 'all',
        port: 1234,
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ],
            }, {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },

        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            'handlebars': 'handlebars/dist/handlebars.js'
        }
    },
};

export default config;