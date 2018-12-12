const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const merge = require('webpack-merge');
const webpack = require('webpack');

const development = require('./dev.config');

require('babel-polyfill');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, '../src'),
    build: path.join(__dirname, '../dist'),
};

process.env.BABEL_ENV = TARGET;

process.traceDeprecation = true;


const common = {
    entry: [
        PATHS.app,
    ],

    resolve: {
        extensions: ['*', '.jsx', '.js', '.json', '.scss'],
        modules: ['node_modules', PATHS.app],
    },
    resolveLoader: {
        modules: ['node_modules', PATHS.app],
    },

    output: {
        path: PATHS.build,
        filename: 'bundle.js',
    },

    node: {
        fs: 'empty',
        net: 'empty',
    },
    module: {
        rules: [{
            test: /bootstrap-sass\/assets\/javascripts\//,
            loader: 'imports-loader?jQuery=jquery',
        }, {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader',
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: [/node_modules/],
        }, {
            test: /\.png$/,
            loader: 'file-loader?name=[name].[ext]',
        }, {
            test: /\.jpg$/,
            loader: 'file-loader?name=[name].[ext]',
        }],
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                output: {
                    path: 'dist/',
                },
                postcss: [
                    autoprefixer({
                        browsers: ['last 2 versions'],
                    }),
                    postcssImport({
                        addDependencyTo: webpack,
                    }),
                ],
            },
        }),
    ],

    stats: {
        maxModules: Infinity,
        optimizationBailout: false,
    },
};

if (TARGET === 'dev') {
    module.exports = merge(development, common);
}
