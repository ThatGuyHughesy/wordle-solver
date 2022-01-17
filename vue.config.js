const { ChakraLoaderPlugin } = require('chakra-loader')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/wordle-solver/'
    : '/',
  configureWebpack: {
    plugins: [
      new ChakraLoaderPlugin()
    ]
  }
}
