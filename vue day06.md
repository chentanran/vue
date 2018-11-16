## vue day06 ##

### webpack安装 ###

安装webpack全局工具

	npm install webpack webpack-cli -g

### webpack基本使用 ###

1. 通过webpack指令打包

	在项目中安装jQuery

		npm install jquery

	建立项目结构

		│  package-lock.json
		│  package.json
		└─src
		    │  index.html
		    │  main.js

	将代码书写在main.js中

		// ES6 的模块化语法导入jQuery
		// import 导入的库对象的变量名
		// from 可以写具体的路径, 也可以写包名 如果写的是包名就会去 /node_modules 中查找
		import $ from 'jquery'
		
		$(function () {  
		  $('ul>li:odd').css('backgroundColor', 'pink')
		  $('ul>li:even').css('backgroundColor', 'purple')
		})

	在index.html直接引入src/main.js无法在浏览器中运行, 因为浏览器不支持import语法

	所以需要使用webpack进行打包输出一个bundle.js

	执行以下指令进行打包:

		webpack ./src/main.js -o ./dist/bundle.js

	直接打包会输出以下警告信息(不影响结果):

	默认会以production模式进行打包, 也就是会压缩合并混淆, 如果不需要压缩合并混淆可以选择使用development模式打包

		WARNING in configuration
		The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
		You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/

	通过 -d 参数可以指定打包模式为development, 表示不压缩, -p 表示production模式, 并压缩

		webpack ./src/main.js -o ./dist/bundle.js -d

2. 通过webpack.config.js书写配置文件后, 直接输入webpack打包 (推荐)

	webpack.config.js配置文件(需要放在项目的根目录下使用):

		const path = require('path')
		module.exports = {
		  entry: './src/main.js', // 入口, 可以为相对路径, 当然绝对路径也没错
		  output: { // 输出配置
		    path: path.join(__dirname, './dist'), // 输出的目录
		    filename: 'bundle.js' // 输出的文件名
		  },
		  mode: 'production' // 打包的模式, production | development
		}

	配置好之后直接输入webpack指令即可打包编译

### webpack-dev-server的使用 ###

上述的配置完毕后, 每次修改完JS代码还是需要手动运行webpack重新打包生成输出文件后使用

如果希望修改完JS后自动打包生成输出文件, 就可以借助webpack-dev-server这个工具完成

使用教程:

1. 安装webpack-dev-server(这个包需要依赖webpack, 所以除了在全局安装webpack还需要在项目本地也安装webpack到开发依赖):

		npm install webpack-dev-server webpack webpack-cli -D

2. 由于webpack-dev-server不是全局安装的, 所以无法直接在命令行运行该指令, 这个包是安装在项目本地的, 需要借助npm工具执行本地脚本, 在 package.json 中配置运行脚本:

	在scripts节点下添加一个dev脚本, 运行webpack-dev-server指令

		"scripts": {
		    "test": "echo \"Error: no test specified\" && exit 1",
		    "dev": "webpack-dev-server"
		  },

3. 配置完运行脚本后, 直接在命令行运行脚本:

		npm run dev

4. 设置webpack-dev-server的端口号

	在脚本命令后面加上参数  --port

		"scripts": {
		    "test": "echo \"Error: no test specified\" && exit 1",
		    "dev": "webpack-dev-server --port 3000"
		  },

5. 设置webpack-dev-server的web服务器的根路径

	在脚本命令后面加上参数  --contentBase

		"scripts": {
		    "test": "echo \"Error: no test specified\" && exit 1",
		    "dev": "webpack-dev-server --contentBase ./src --port 3000"
		  },

6. 设置webpack-dev-server的自动打开浏览器

	在脚本命令后面加上参数  --open

		"scripts": {
		    "test": "echo \"Error: no test specified\" && exit 1",
		    "dev": "webpack-dev-server --open --contentBase ./src --port 3000"
		  },

6. 设置webpack-dev-server的热模块替换

	在脚本命令后面加上参数  --hot

		"scripts": {
		    "test": "echo \"Error: no test specified\" && exit 1",
		    "dev": "webpack-dev-server --hot --open --contentBase ./src --port 3000"
		  },

注意: 默认情况下 webpack-dev-server 会将入口的文件打包输出到项目的根目录, 并且不会在物理磁盘中保存, 只在内存中存放, 方便开发调试

现在bundle.js已经是托管到内存中了, 如果需要将HTML也托管到内存中, 需要借助一个插件: html-webpack-plugin

安装:

	npm install html-webpack-plugin -D

所有webpack的插件都需要在webpack的配置文件中的plugins节点下注册:

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	    new HTMLWebpackPlugin({
	      template: path.join(__dirname, './src/index.html'), // 源文件
	      filename: 'index.html' // 输出在服务器根目录的文件名, 文件存放在内存中, 不会在磁盘上显示
	    })
	  ],

使用该插件后, 内存中的index.html会自动添加bundle.js的引入, 无需手动引入

### webpack的loader ###

webpack默认无法打包除了js文件以外的所有文件, 所以不同的文件类型都需要安装对应的loader才可以加载, 否则会报错

1. css加载

	默认无法加载css文件, 如果需要加载css文件, 得安装两个包: css-loader style-loader

		npm install css-loader style-loader -D

	在main.js中引入外部的css文件, 注意: 以后引入css文件都不要在HTML中引入, 为了避免二次http请求

		// ES6的import语法可以导入js和css
		import './css/index.css'

	安装完后无法直接使用loader, 还需要进行相应的配置

		module: {
		    rules: [
		      // loader的加载顺序是从右到左的
		      // css-loader是帮助webpack编译css文件. 而style-loader是将最终编译的结果放到HTML中生效
		      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
		    ]
		  },

2. less加载

	默认无法加载less文件, 需要使用less-loader less包

		npm install less less-loader -D

	在main.js中引入外部的less文件

		import './css/test.less'

	安装完后无法直接使用loader, 还需要进行相应的配置

		module: {
		    rules: [
		      {
		        test: /\.css$/,
		        use: [
		          { loader: "style-loader" },
		          { loader: "css-loader" }
		        ]
		      },
		      {
		        test: /\.less$/,
		        use: [
		          { loader: "style-loader" },
		          { loader: "css-loader" },
		          { loader: "less-loader" }
		        ]
		      }
		    ]
		  },

3. sass加载

	默认无法加载scss文件, 需要使用sass-loader node-sass包

		npm install sass-loader node-sass -D

	在main.js中引入外部的less文件

		import './css/demo.scss'

	安装完后无法直接使用loader, 还需要进行相应的配置

		module: {
		    rules: [
		      {
		        test: /\.css$/,
		        use: [
		          { loader: "style-loader" },
		          { loader: "css-loader" }
		        ]
		      },
		      {
		        test: /\.less$/,
		        use: [
		          { loader: "style-loader" },
		          { loader: "css-loader" },
		          { loader: "less-loader" }
		        ]
		      },
			  {
		        test: /\.scss$/,
		        use: [
		          { loader: "style-loader" },
		          { loader: "css-loader" },
		          { loader: "sass-loader" }
		        ]
		      }
		    ]
		  },