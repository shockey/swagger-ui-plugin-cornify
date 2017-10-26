const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    'swagger-ui-cornify': [
      './src/index.js'
    ]
  },

  output: {
    path: path.join(__dirname, 'dist'),
    library: 'SwaggerUICornify',
    libraryTarget: 'umd',
    filename: 'swagger-ui-cornify.min.js'
  },

  externals: (ctx, req, next) => {
    next(null, false)
  },

  module: {
    loaders: [{
      test: /\.js/,
      loader: 'babel-loader',
      exclude: [
        /node_modules/
      ]
    }]
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}
