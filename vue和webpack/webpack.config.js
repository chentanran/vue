const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
        }),
        new VueLoaderPlugin()
    ],
    module:{
        rules:[
            {test: /\.css$/, use:["style-loader", "css-loader"]},
            {test: /\.less/, use: ['style-loader', 'css-loader', 'less-loader']},
            {test: /\.(png|jpg|jpeg|gif)/, use: ["url-loader?limit=7000&name=[hash:8].[name].[ext]"]},
            {test: /\.(eot|svg|ttf|woff|woff2)/, use: ['url-loader']},
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
            {test: /\.vue$/, use: ['vue-loader']}
        ]
    },
    // resolve:{
    //     alias:{
    //         // "vue$": "vue/dist/vue.js"
    //     }
    // }
}