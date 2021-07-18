const path = require('path')

module.exports = {
  webpack: (config) => {
    config.output.library = 'react-template'
    config.output.libraryTarget = 'umd'
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    }
    return config
  },
  devServer: (configFunction) => {
    return function (proxy, allowHost) {
      const config = configFunction(proxy, allowHost)
      config.headers = {
        'Access-Control-Allow-Origin': '*',
      }
      return config
    }
  },
}
