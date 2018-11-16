const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "development",
    entry: "./src/main.js",
    output: {
        path: path.join(__dirname,"dist"),
        filename: "bundle.js"
    },
    plugins:[
        new HTMLWebpackPlugin({
            template: path.join(__dirname, "./src/index.html"), //将index.html文件托管到内存
            filename: "index.html"
        })
    ],
    module:{
        rules:[
            {test: /\.css$/, use:["style-loader", "css-loader"]}
        ]
    }
}