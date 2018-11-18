## vue day07 ##

### url-loader ###

因为在css中使用图片或字体文件时会引入外部资源, 而webpack进行打包时默认不支持这些外部资源的打包, 所以需要借助 url-loader

小tips: url-loader和file-loader功能类似, url-loader包含了file-loader而且独立于file-loader存在, 意味着使用url-loader不需要安装file-loader, 两者区别在于, url-loader可以指定一些参数

用法:

1. 安装url-loader

		npm install url-loader -D

2. 在webpack.config.js中配置

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
		      },
		      {
		        test: /\.(png|jpg|gif|bmp|webp)$/,
		        use: [
		          {
		            loader: 'url-loader?limit=14240&name=[hash:8]-[name].[ext]',
		            // options: {
		            //   limit: 8192 // 限制: 图片的最大大小, 如果超过了最大限制将会以原图片打包, 如果小于限制则会通过 base64 进行转码
		            // }
		          }
		        ]
		      },
		      {
		        test: /\.(eot|ttf|woff|woff2|svg)$/,
		        use: 'url-loader',
		      }
		    ]
		  }

	注意: 在css中引入外部的图片或字体都需要用url-loader来加载, 建议分开匹配, 方便管理

### babel-loader ###

在项目中如果用到了高级的ES6语法, 例如class关键字, webpack默认无法进行打包, 需要借助babel将高级语法转译为ES5语法之后再进行打包

用法:

1. 装两套包

	babel核心和babel-loader以及babel的插件

		npm install babel-loader@7 babel-core babel-plugin-transform-runtime -D

	babel的语法支持

		npm install babel-preset-env babel-preset-stage-0 -D

2. 配置loader

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
		      },
		      {
		        test: /\.(png|jpg|gif|bmp|webp)$/,
		        use: [
		          {
		            loader: 'url-loader?limit=14240&name=[hash:8]-[name].[ext]',
		            // options: {
		            //   limit: 8192 // 限制: 图片的最大大小, 如果超过了最大限制将会以原图片打包, 如果小于限制则会通过 base64 进行转码
		            // }
		          }
		        ]
		      },
		      {
		        test: /\.(eot|ttf|woff|woff2|svg)$/,
		        use: 'url-loader',
		      },
		      {
		        test: /\.js$/,
		        exclude: /(node_modules|bower_components)/,
		        use: {
		          loader: 'babel-loader',
		        }
		      }
		    ]
		  },

3. 配置babel, 在项目根目录新建一个.babelrc文件

	{
	  "presets": [
	    "env",
	    "stage-0"
	  ],
	  "plugins": [
	    "transform-runtime"
	  ]
	}

### vue实例的render方法 ###

以前创建vue实例:

控制app区域

	var vm = new Vue({
		el: '#app',
		data: {},
		methods: {}
	})

如果需要将某个组件放置到APP区域, 可以注册组件后直接在HTML中使用组件

	var login = {
		template: '<h1>登录组件</h1>'
	}

	var vm = new Vue({
		el: '#app',
		data: {},
		methods: {},
		components: {
			login
		}
	})

注册完毕后可以在页面上直接引入组件

	<div id="app">
		<login></login>
	</div>

使用render函数来使用组件:

	var login = {
	    template: '<h1>登录组件</h1>'
	}
	
	var vm = new Vue({
	    el: '#app',
	    data: {},
	    methods: {},
	    render: function(createElements) {
			return createElements(login)
		}
	})

render函数的特点就是, 创建vm实例时, 将指定的组件渲染成HTML代码, 直接将app区域的容器替换为该组件, app内部的内容将会全部清空

### vue-loader ###

默认情况下webpack无法读取vue文件, 需要做组件的抽离, 就得借助vue-loader

用法:

1. 安装vue-loader和vue-tempalte-compiler

		npm install vue-loader vue-template-compiler -D

2. 配置loader

		{
	        test: /\.vue$/,
	        use: {
	          loader: 'vue-loader',
	        }
	      }

3. 必须配置VueLoaderPlugin(不需要额外装包, 该插件在vue-loader中自带)

		// webpack.config.js
		const VueLoaderPlugin = require('vue-loader/lib/plugin')

		plugins: [
		    new webpack.HotModuleReplacementPlugin(),
		    new HTMLWebpackPlugin({
		      template: path.join(__dirname, './src/index.html'),
		      filename: 'index.html'
		    }),
		    new VueLoaderPlugin()
		  ],

配置完毕后就可以在main.js中引入.vue文件, 使用render函数进行渲染了

此方法适合在 vue.common.runtime.js 文件中使用

### export default 和 export 的区别 ###

export default 用于导出当前模块的某个成员

注意点:

1. 一个模块只能导出一个, 不需要在模块中起名字
2. 导入时来定义使用的变量名即可

举例: 

test.js

	export default {
		name: '刘希晗',
		age: 38
	}

main.js

	import pig from './test.js'

export 可以单独导出当前模块的某个成员

注意点:

1. 可以导出多个成员
2. 导出时就需要定义好变量名
3. 导入时必须按照导出的名称来接收, 但是可以通过 as 来起别名

举例: 

test.js

	export const animal = {
		name: '刘希晗',
		age: 38
	}

	export const son = {
		name: '四金',
		age: 18
	}

main.js

	import { animal as fourGold, son } from './test.js'


### 在webpack中使用vue-router ###

1. 装包

		npm install vue-router

2. 导入vue和vue-router并且注册路由组件

	main.js:

		import Vue from 'vue'
		import VueRouter from 'vue-router'
		// 注册路由
		Vue.use(VueRouter)

		// 导入组件
		import app from './App.vue'
		import account from './main/Account.vue'

		// 创建路由实例
		const router = new VueRouter({
			routes: [
				{ path: '/account', component: account}
			]
		})

		// 创建vm实例
		const vm = new Vue({
			el: '#app',
			render: c => c(app),
			router // 挂载路由对象到vm对象上
		})

3. 还需要在App.vue页面上配置<router-view></router-view>标签, 将来访问/account时就会切换组件显示

### .vue文件组件内部的style标签属性 ###

lang: 指定style的语言, 可选less或sass/scss

scoped: 单属性, 不需要设置属性值, 让style只在当前组件内生效

### vue的脚手架 ###


由于webpack配置比较繁琐, 而且没有逻辑性可言, 对于开发人员来讲不太友好, 很多开发者希望能有现成的模板

当然, 早期网络上有很多现成的代码可以拷贝, 但是由于webpack不断再更新, 周边的插件或loader之类的东西也在不断地更新, 对于前端工程师来讲就需要不断的学习, 投入大量的精力在环境上

所以, vue官方提供了脚手架, 帮助我们快速部署基于webpack的vue开发环境

脚手架名为: vue-cli

用法:

1. 装包

	全局安装脚手架工具

		npm install vue-cli -g

2. 使用脚手架创建模板

	创建完整版的webpack配置(困难)

		vue init webpack 项目名称

	创建简单版的webpack配置(简单,适合初学者)

		vue init webpack-simple 项目名称

3. 如果是用的是第一种模板, 会自动运行npm install, 第二种简单模板需要手动运行npm install, 然后使用npm run dev打开项目