const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',//'production',//打包模式，开发模式下不压缩
  // devtool: 'inline-source-map',//sourcemap模式
  entry: './src/index.js',
  output: {
    libraryTarget:'umd',
    umdNamedDefine: true,
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library:'rc-form-table',
  },
  externals:{
    react:'react',
    antd:'antd'
  },
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
                          chrome: "40",
                          // ie: "11"
                      }}
                  ]
              ],
              plugins: [
                  ["@babel/plugin-transform-runtime",{corejs:3}],
                  "@babel/plugin-proposal-optional-chaining",
                  "@babel/plugin-proposal-nullish-coalescing-operator",
                  ["@babel/plugin-proposal-decorators",{legacy:true}],
                  ["@babel/plugin-proposal-private-methods",{loose:true}],
                  ["@babel/plugin-proposal-class-properties",{loose:true}],
              ] 
          }
      }
      }
    ]
  },
  plugins:[
    // new BundleAnalyzerPlugin(),
    // new webpack.ProvidePlugin({
    //   react: ['react'],
    //   antd:['antd']

    // })
  ]
};