const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',//'production','development'//打包模式，开发模式下不压缩
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
    'react': {
      'commonjs': 'react',
      'commonjs2': 'react',
      'amd': 'react',
      // React dep should be available as window.React, not window.react
      'root': 'React'
    },
    'react-dom': {
      'commonjs': 'react-dom',
      'commonjs2': 'react-dom',
      'amd': 'react-dom',
      'root': 'ReactDOM'
    },
    antd:'antd',
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
                            chrome: "60",
                            // ie: "11"
                        },
                      }
                    ],
                  
              ],
              // plugins: [
              //     ["@babel/plugin-transform-runtime"],
              // ] 
          }
        },
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