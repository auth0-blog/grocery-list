import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import helpers from './helpers';

const TYPESCRIPT_LOADER = {
    test: /\.ts$/,
    loaders: [
        'awesome-typescript-loader?tsconfig=src/client/tsconfig.json',
        'angular2-template-loader'
    ]
};

const CSS_STYLE_LOADER = {
    test: /\.css$/,
    exclude: helpers.root('src', 'client', 'app'),
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
};

const CSS_RAW_LOADER = {
    test: /\.css$/,
    include: helpers.root('src', 'client', 'app'),
    loader: 'raw'
};

const HTML_LOADER = {
    test: /\.html$/,
    loader: 'html'
};

const STATIC_FILE_LOADER = {
    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
    loader: 'file?name=assets/[name].[hash].[ext]'
};

const SASS_LOADER = {
    test: /\.(sass|scss)$/,
    loaders: ['css-to-string-loader', 'css-loader?sourceMap', 'resolve-url', 'sass-loader?sourceMap']
};

const FONT_LOADER = {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000&minetype=application/font-woff"
}

const ICON_LOADER = {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "file"
};

module.exports = {
    entry: {
        'polyfills': './src/client/polyfills.ts',
        'vendor': './src/client/vendor.ts',
        'app': './src/client/main.ts'
    },

    resolve: {
        extensions: ['', '.ts', '.js']
    },

    module: {
        loaders: [
            TYPESCRIPT_LOADER, HTML_LOADER,
            STATIC_FILE_LOADER, CSS_RAW_LOADER,
            CSS_STYLE_LOADER, SASS_LOADER,
            FONT_LOADER, ICON_LOADER
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/client/index.html'
        })
    ]
};