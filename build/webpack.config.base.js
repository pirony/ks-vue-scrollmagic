const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { resolve } = require('path')

const {
  banner,
  filename,
  version,
  vueLoaders
} = require('./utils')

const plugins = [
  new webpack.DefinePlugin({
    '__VERSION__': JSON.stringify(version),
    'process.env.NODE_ENV': '"test"'
  }),
  new webpack.BannerPlugin({ banner, raw: true, entryOnly: true }),
  new ExtractTextPlugin({
    filename: `${filename}.css`,
    // Don't extract css in test mode
    disable: /^(common|test)$/.test(process.env.NODE_ENV)
  })
]

module.exports = {
  output: {
    path: resolve(__dirname, '../dist'),
    filename: `${filename}.common.js`
  },
  entry: './src/index.js',
  resolve: {
    extensions: ['.js', '.vue', '.jsx', 'css'],
    alias: {
      'src': resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: 'babel-loader',
        include: [
          resolve(__dirname, '../node_modules/@material'),
          resolve(__dirname, '../src'),
          resolve(__dirname, '../test')
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: vueLoaders,
          postcss: [require('postcss-cssnext')()]
        }
      },
      {
        test: require.resolve('gsap/src/uncompressed/TweenMax.js'),
        use: [{
          loader: 'expose-loader',
          options: ['TweenMax', 'TweenLite', 'TimelineMax']
        }]
      },
      {
        test: require.resolve('scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
        use: [{
          loader: 'expose-loader',
          options: ['ScrollMagic']
        }]
      }
    ]
  },
  plugins,
  extend (config) {
    config.resolve.alias["TweenLite"]= path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
    config.resolve.alias["TweenMax"]= path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
    config.resolve.alias["TimelineMax"]= path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
    config.resolve.alias["ScrollMagic"]= path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
    config.resolve.alias["animationgsap"]= path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
    config.resolve.alias["picker"]= path.resolve('node_modules', 'materialize-css/js/date_picker/picker.js')
  }
}
