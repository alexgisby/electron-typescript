const webpack = require('webpack');
const path = require('path');

const babelOptions = {
    'presets': [
        'env'
    ],
    'cacheDirectory': 'babel_cache'
};

module.exports = {
    target: 'electron-renderer',
    node: {
        __dirname: false
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    entry: [
        path.join(__dirname, 'index.ts')
    ],
    output: {
        path: path.join(__dirname, '..', '..', 'app'),
        filename: path.join('js', 'bundle.js')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                use:[
                    {
                        loader: 'babel-loader',
                        options: babelOptions
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};
