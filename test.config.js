const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',//打包模式，开发模式下不压缩
  devtool: 'inline-source-map',//sourcemap模式
  devServer: {
    contentBase: './dist',
    open:true
  },
  entry: './test/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader:'babel-loader',
            options:{
                presets: [ 
                    "@babel/preset-react",
                    [
                    "@babel/preset-env",{
                        targets: {
                            chrome: "60",
                            // ie: "11"
                        }}
                    ]
                ],
                plugins: [
                    ["@babel/plugin-transform-runtime",{corejs:3}],
                    // "@babel/plugin-proposal-optional-chaining",
                    // "@babel/plugin-proposal-nullish-coalescing-operator",
                    // ["@babel/plugin-proposal-decorators",{legacy:true}],
                    // ["@babel/plugin-proposal-private-methods",{loose:true}],
                    // ["@babel/plugin-proposal-class-properties",{loose:true}],
                ],
                comments:false
            }
        }
      },
      {
        test: /\.css$/i,
        use:[
        'style-loader',
        {
          loader:'css-loader',
          options:{
            modules:false,
          }
        }]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './test/index.html'}),
  ]
};