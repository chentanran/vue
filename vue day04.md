## vue day04 ##

### 列表动画 ###

与单个元素动画不同, 需要使用transition-group标签包裹

使用transition-group的注意事项:

1. v-for列表渲染时必须指定key
2. transition-group默认会被渲染成span标签, 可以通过tag属性指定要渲染的标签
3. appear属性可以让transition-group实现页面加载时的进场动画
4. 其他地方同transition实现动画的方式, 也需要添加css类样式完成动画
5. 如果涉及到元素的删除动画, 可以添加v-move类样式使其变得更平滑

		<transition-group appear tag="ul">
			<li v-for="item in list" :key="item.id"></li>
		</transition-group>



### 组件化开发 ###

组件化: 在视图层对页面的划分, 为了提高代码复用性和可维护性推出的思想, 广泛应用在前端领域

### 定义组件 ###

1. extend方法创建组件对象, 使用component方法来注册

	通过Vue.extend创建vue组件对象

		var com1 = Vue.extend({
			template: '<h3>通过extend创建的子组件1</h3>'
		})

	通过Vue.component方法注册组件

	参数1: 组件名
	
	参数2: 组件对象

		Vue.component('myCom1', com1)

	以上两步完成之后, 在页面中可以直接以HTML标签方式使用组件, 如果是驼峰命名法的组件名, 需要把驼峰命名换成 - 连接

		<my-com1></my-com1>

2. 直接创建组件对象, 使用component方法注册

		Vue.component('myCom1', {
			template: '<h1>通过直接创建对象来注册组件</h1>'
		})

	用法同上

		<my-com1></my-com1>

3. (推荐)在HTML中写好模板代码, 使用component方法通过ID注册

	在app控制区域外面定义好模板

		<template id="tmp">
			<h1>这里有语法高亮和代码提示非常爽!!!</h1>
		</template>

	使用component方法注册组件

		Vue.component('myCom1', {
			template: '#tmp',
			data() {
				return {
				}
			},
			methods: {
				show() {}
			}
		})

	用法同上

		<my-com1></my-com1>

**注意: 组件内部必须有且只有一个根元素**

以上是注册全局组件

同样, 在vm实例对象的配置选项中也可以配置 components 来注册私有组件

### 组件中的data ###

在组件中也可以有自己内部的data 和 methods, 但是组件的data属性必须是一个function, 并且该函数内部要返回一个对象, 为了保证项目中用到多个组件时, 数据的独立性

### 组件切换动画 ###

原理和单标签动画一样, 在组件标签 <component>标签外面包裹一层transition标签, 再添加css样式即可

	<transition mode="out-in">
		<component :is="comName"></component>
	</transition>

样式同transition动画, 设置以下两组样式属性:

	v-enter, v-leave-to {}
	v-enter-active, v-leave-active {}

### 组件传值 ###

1. 父组件向子组件传值

	在父组件中定义好数据, 例如在data中声明数据

		data: {
			msg: '这是父组件中的数据!'
		}

	在子组件的标签上通过属性绑定的形式, 将数据传递给子组件

		<son :gift="msg"></son>

	在子组件的props属性中先声明父组件传过来的同名属性

		props: ['gift']

	定义完成后就可以在子组件中随意的使用父组件的数据了

	**注意事项: props中的数据, 只能通过父组件进行修改, 子组件中不要进行修改, 因为该数据是单向下行绑定的, 也就是说只有父组件修改了会更新所有子组件中用到的数据, 但子组件修改不会反向更新到父组件或其他子组件**

2. 子组件向父组件传值

	在子组件中定义好数据, 例如在子组件的data中声明数据

		data: function() {
			return {
				sonData: '这是子组件的数据'
			}
		}

	父组件中先定义好接收数据的回调函数, 在methods中定义

		methods: {
			show(data) {
				console.log('这是传过来的数据:' + data)
			}
		}

	在子组件身上绑定一个"自定义事件"

		<son @transfer="show"></son>

	在子组件特定的时期触发事件, 所谓的特定的时期是指, 例如子组件的按钮被点击, 或者获取到数据之类的情况...为了方便演示, 就在子组件中放一个按钮并绑定点击事件, 当按钮被点击时触发父组件绑定的transfer事件

		<input type="button" value="子组件中的按钮" @click="sonClick">

	在子组件的methods中需要定义好sonClick函数:

		methods: {
			sonClick() {
				// vue提供触发父组件事件的方法是:
				// $emit方法第一个参数是父组件绑定的事件名
				// 参数2: 父组件绑定事件的函数形参
				// 参数2-参数n都是父组件绑定的函数形参
				this.$emit('transfer', this.sonData)
			}
		}

