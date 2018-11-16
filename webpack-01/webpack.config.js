const path = require("path")

const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装

module.exports = {
    module: {
        rules: [
          { test: /\.css$/, use:[ {loader:'style-loader'},{loader:'css-loader'}] },
          {test: /\.less$/, use:[ {loader:"style-loader"},{loader:"css-loader"},{loader:"less-loader"}]}
        ]
      },
    entry: "./src/main.js",
    output:{
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            // title: "这是一个列表",
            template: path.join(__dirname,"./src/index.html"),
            filename: "index.html"
        })
    ]
  
}