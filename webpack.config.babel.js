import path    from 'path'
import webpack from 'webpack'
import HTMLPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import precss from 'precss'
import cssnext from 'postcss-cssnext'

let ROOT_PATH = path.resolve(__dirname)
let SRC_PATH  = path.resolve(ROOT_PATH, 'src')
let DIST_PATH = path.resolve(ROOT_PATH, 'dist')
let MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules')

let isProdEnv = (process.env.NODE_ENV == 'production' ? true : false)

let config = {
  entry: {
    'app'   : path.resolve(SRC_PATH, 'main'),
    'vendor': ['react', 'react-router', 'react-dom', 'redux', 'react-redux']
  },
  output: {
    path: DIST_PATH,
    filename  : 'bundle.js?[hash]',
    chunkFilename: '[name].chunk.js?[hash]',
    publicPath: '/'
  },
  plugins: [
      new HTMLPlugin({
        template: path.resolve(SRC_PATH, 'assets', 'index.html'),
        inject  : true
      }),
      new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js?[hash]")
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [SRC_PATH, MODULE_PATH]
      },
      {
        test: /\.css$/,
        exclude: [path.resolve(SRC_PATH, 'styles'), path.resolve(MODULE_PATH, '@boluome', 'blm-web-components', 'src', 'styles')], // 局部 CSS（local）- 除了 src/styles 之外的所有
        loader: 'style!css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss'
        // isProdEnv ? ExtractTextPlugin.extract('style!css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss') : 'style!css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss'
      },
      {
        test: /\.css$/,
        include: [path.resolve(SRC_PATH, 'styles'), path.resolve(MODULE_PATH, '@boluome', 'blm-web-components', 'src', 'styles')], // 全局 CSS（global) - src/styles
        loader: 'style!css!postcss'
        // isProdEnv ? ExtractTextPlugin.extract('style!css!postcss') : 'style!css!postcss'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        include: [ path.resolve(SRC_PATH, 'images'), MODULE_PATH ],
        loader: 'file?name=images/[name].[ext]&context=./dist/'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        include: [ path.resolve(SRC_PATH, 'apps', 'dianying', 'images'), MODULE_PATH ],
        loader: 'file?name=images/dianying/[name].[ext]&context=./dist/'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
<<<<<<< HEAD
        include: [ path.resolve(SRC_PATH, 'apps', 'hotel', 'images'), MODULE_PATH ],
        loader: 'file?name=images/hotel/[name].[ext]&context=./dist/'
=======
        include: [ path.resolve(SRC_PATH, 'apps', 'waimai', 'images'), MODULE_PATH ],
        loader: 'file?name=images/waimai/[name].[ext]&context=./dist/'
>>>>>>> badd2829d42255967fdea35917d886f228e4a202
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, // css 中直接使用 url(../icons/MaterialIcons-Regular.eot)，打包会复制到 dist 目录
        include: [ path.resolve(SRC_PATH, 'icons'), path.resolve(MODULE_PATH, '@boluome', 'blm-web-components', 'src', 'icons') ],
        loader: 'file?name=icons/[name].[ext]&context=./dist/'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        include: [ path.resolve(SRC_PATH, 'fonts') ],
        loader: 'file?name=fonts/[name].[ext]&context=./dist/'
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      }
    ]
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      'src'
    ],
    alias: {
      'images'   : path.resolve(SRC_PATH   , 'images'),
      'normalize': path.resolve(MODULE_PATH, 'normalize.css', 'normalize.css'),
      'cpnt'     : path.resolve(SRC_PATH, 'components'),
      'libs'     : path.resolve(SRC_PATH, 'libs'),
      'main.css' : path.resolve(SRC_PATH, 'styles', 'main.css'),
      'react'       : path.resolve(MODULE_PATH, 'react'),
      'react-dom'   : path.resolve(MODULE_PATH, 'react-dom'),
      'react-router': path.resolve(MODULE_PATH, 'react-router', 'es6'),
      'react-redux' : path.resolve(MODULE_PATH, 'react-redux'),
      'superagent': path.resolve(MODULE_PATH, 'superagent', 'lib', 'client'),
      'findIndex': path.resolve(MODULE_PATH, 'lodash', 'findIndex')
    },
    noParse: [ /react/, /react-dom/, /react-router/, /redux/, /react-redux/ ]
  },
  devServer: {
    historyApiFallback: true,
    outputPath: DIST_PATH
  },
  postcss: function(webpack) {
    var plugins = [
        precss,
        cssnext
    ];
    return plugins;
  }
}

if(isProdEnv) {
  config.devtools = false;

  config.plugins.concat([
    new ExtractTextPlugin("styles.css", {
        allChunks: true
    }),
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
  ])
} else {
  config.plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ])
}


export default config
