## vue day05 ##

### refs的使用 ###

在vue中不提倡DOM操作, 但是有些特殊情况使用vue无法完成的功能, 必须借助DOM操作时, 也可以采取ref属性来将元素添加到vm实例的$refs中

	<h3 ref="myh3">这是一个h3</h3>

在vue实例中可以直接通过$refs来使用myh3元素

	vm.$refs.myh3

如果在vm的methods中, vm对象使用this即可

	this.$refs.myh3

注意: ref可以引用普通的DOM元素, 同时也可以引用Vue的组件

引入组件后, 可以在父组件中直接获取子组件的引用, 从而可以直接访问子组件中的data和methods以及其他所有的成员

	<login ref="mylogin"><login>

如果login组件中有数据: msg

在vm实例中可以直接访问:

	vm.$refs.mylogin.msg

一般不推荐这么使用

### 路由 ###

后端路由: 客户端向服务器的某个URL发送请求, 服务器会对客户端进行相应的响应, 这一条匹配规则被称为路由, 也是所谓的后端路由, 特点是 有客户端向服务器发送请求

前端路由: 不存在与后端进行交互, 不会发送请求, 实现页面的切换(组件的切换), 针对单页面程序通过#锚点来实现组件的切换

使用方式:

1. 引入vue-router.js文件
2. 模块化工程(以后介绍)

基本的路由使用:

1. 在vue.js之后导入vue-router.js文件


2. 创建VueRouter对象, 配置路由的匹配规则, 注册组件和关联路由对象

	配置路由匹配规则时, component属性对应的必须是一个组件对象 而非字符串! 所以需要提前创建好组件对象

		// 创建登录和注册的组件对象
		var login = {
			template: '<div>登录组件</div>'
		}

		var register = {
			template: '<div>注册组件</div>'
		}

		var router = new VueRouter({
			// routes表示路由的匹配规则, 可以有很多条, 每条匹配规则需要两个属性: path 和 component
			routes: [
				{ path: '/login', component: login },
				{ path: '/register', component: register }
			]
		
		})

		var vm = new Vue({
			el: '#app',
			data: {},
			methods: {},
			// 关联路由: 注册路由时会在路由内部帮我们注册好组件, 无需自己手动注册
			router
		})

3. 在页面中配置好<router-view></router-view>组件, 占坑

		<div id="app">
			<router-view></router-view>
		</div>

4. 为了让用户更方便的切换组件, 可以配置好a标签让其点击进行跳转

		<div id="app">
			<a href="#/login">登录</a>
			<a href="#/register">注册</a>
			<router-view></router-view>
		</div>

	配置好以上步骤之后, 请求当前页面的 #/login 时就会在router-view区域显示login组件

5. 使用router-link来渲染a标签

	为了避免每次写a标签都加 # 在前面, 所以VueRouter提供了一个router-link的组件 辅助渲染a标签

	可以通过to设置路由跳转, 省略#
	
	可以通过tag来设置渲染的标签, 默认渲染为a标签, 如果渲染为其它标签也会加上点击事件实现跳转

		<div id="app">
			<router-link tag="span" to="/login">登录</router-link>
			<router-link to="/register">注册</router-link>
			<router-view></router-view>
		</div>

6. 通过redirect来将根路径重定向到某个路径

	在routes路由匹配规则中定义

		var router = new VueRouter({
			routes: [
				{ path: '/', redirect: '/login' },
				{ path: '/login', component: login },
				{ path: '/register', component: register },
			]
		})

7. 设置当前选中路由链接高亮

	当router-link被点击的时候会有一个默认的类样式: router-link-active, 可以通过css给该类名添加一些样式实现当前选中链接高亮

		.router-link-active {
	      color: red;
	      font-weight: 800;
	      font-style: italic;
	      font-size: 80px;
	      text-decoration: underline;
	      background-color: green;
	    }

	该类名可以进行自定义, 在路由构造函数的配置对象中, 通过linkActiveClass属性进行自定义

		var routerObj = new VueRouter({
			routes: [
		        { path: '/', redirect: '/login' }, // 这里的 redirect 和 Node 中的 redirect 完全是两码事
		        { path: '/login', component: login },
		        { path: '/register', component: register }
	     	],
	      	linkActiveClass: 'myactive'
    	})

8. 给路由切换加动画

	原理和单元素动画一样, 在 <router-view></router-view> 组件外面包裹transition组件即可开始做动画, 同时配置好css类样式

		<transition>
			<router-view></router-view>
		</transition>

### 路由传参 ###

这里的路由传参与http中get和post传参意义不同, 这里特指的是前端路由传参, 不会发送http请求, 仅仅只是为了组件之间切换时携带参数过去

1. 通过query传参, 不需要修改路由匹配规则, 在做跳转时后面加 ? 传参即可, 同http的get请求传参一样

	当跳转到目标组件后, 通过组件对象的 $route 可以获取当前的路由信息

	其中fullpath表示完整路径

	path表示路径

	query表示query字段的参数

2. 通过params传参, 类似于后端的RestfulAPI设计

	需要修改路由的匹配规则

		{ path: '/login/:id', component: login }

	传参时需要: `/login/10`

### watch属性 ###

watch可以用于监视vue中data数据的变化, 同时也可以监视路由的改变

监视data:

	data: {
		msg: '这是数据'
	},

	watch: {
		msg: function(newVal, oldVal) {
			// 当msg数据改变时会调用该函数
			// 参数1是新的值, 参数2是以前的值
		}
	}

监视路由(重点):

	watch: {
		'$route': function(to, from) {
			
		}
	}

### computed属性 ###

1. computed中虽然声明的都是函数, 但是使用时就把它当成变量属性去使用即可, 而且在computed中声明的数据和data中是有冲突的, 不能同时声明同名的数据

2. computed属性是只读的, 不能认为修改, 只有当computed内部引用的data数据发生变化时会自动修改

3. computed属性会缓存

		computed: {
			test() {
				// 当data中的msg1或者msg2任意一个属性发生变化时, test属性也会变化
				return this.msg1 + this.msg2
			}
		}