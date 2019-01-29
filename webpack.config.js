const path = require(`path`)
const CleanWebpackPlugin = require(`clean-webpack-plugin`)

const commonPublicPath = `/dist/`
const vendorsBundleName = `vendors`

module.exports = {
  entry: {
    myPackageDemo: [`@babel/polyfill`, `./html/render.js`],
  },

  plugins: [
    new CleanWebpackPlugin([`dist`])
  ],

  output: {
    library: `[name]`,
    filename: `[name].bundle.js`,
    publicPath: commonPublicPath
  },

  resolve: {
    alias: {
      "react": path.resolve(`./node_modules/react`),
      "react-dom": path.resolve(`./node_modules/react-dom`),
      "styled-components": path.resolve(`./node_modules/styled-components`)
    },
  },

  optimization: {
    runtimeChunk: {
       name: vendorsBundleName
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: vendorsBundleName,
          chunks: 'all'
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules\//,
        use: `babel-loader`
      }
    ]
  },

  devServer: {
    port: 9000,
    contentBase: path.resolve(__dirname, `html`),
    publicPath: commonPublicPath
    // Add if developing a SPA to redirect non-matching routes known by WDS (i.e. no document in /html) to the router
    // historyApiFallback: true
  }
}
