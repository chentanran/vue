## vue day03 ##

### 使用vue-resource ###

**注意: 线上服务器地址统一更改为: http://www.lovegf.cn:8899/**

准备工作:

先导入vue.js

在导入vue-resource.js

当导入完vue-resource包以后, 就可以在Vue的实例对象中使用$http属性来发送Ajax请求, 因为vue-resource就是将$http属性挂载到Vue的原型对象中


1. 发送get请求

		var vm = new Vue({
			el: '#app',
			data: {},
			methods: {
				getInfo() {
					this.$http.get('http://lovegf.cn:8899/api/getlunbo').then(result => {
						// result是vue-resource帮我们多封装了一层对象, 如果需要获取服务器返回的数据, 需要用result.body
						result.body
					})
				}
			}
		})

2. 发送jsonp请求同上
3. 发送post请求

	post请求的第三个参数用于配置发送的请求参数, 例如: emulateJSON : true 用于告诉服务器这是一个普通的表单信息 application/x-www-form-urlencoded

		postInfo() {
			this.$http.post('http://lovegf.cn:8899/api/getlunbo', {}, { emulateJSON: true}).then(result => {
				// result是vue-resource帮我们多封装了一层对象, 如果需要获取服务器返回的数据, 需要用result.body
				result.body
			})
		}

通过vue-resource设置全局根域名

	 Vue.http.options.root = 'http://www.lovegf.cn:8899/';

注意: 如果需要使用根域名配置, 在发送请求时必须是相对路径, 不能以 `/` 开头, 例如:

	// 不生效:
	this.$http.get('/api/getlunbo')

	// 生效:
	this.$http.get('api/getlunbo')

通过vue-resource设置全局开启application/x-www-form-urlencoded方式提交表单

	Vue.http.options.emulateJSON = true;

### Vue动画 ###

注意: Vue的动画不是为了页面特效而出现的, 只是为了让APP用户体验更好的同时帮助用户理解我们的产品逻辑

动画被vue分成了两个阶段: 入场和离场

动画的六个类名表示六个动画的执行阶段:

入场动画的类样式:

	.v-enter : 动画开始前的状态, 动画开始后的下一帧就会被移除

	.v-enter-active : 动画开始执行到结束之间的过渡类名, 动画执行完毕后会被移除

	.v-enter-to : 元素最终要去的目的地

离场动画的类样式:

	.v-leave : 动画开始前的状态, 动画开始后的下一帧就会被移除

	.v-leave-active : 动画开始执行到结束之间的过渡类名,  动画执行完毕后会被移除

	.v-leave-to : 元素最终要去的目的地

根据官方示例图表示, v-enter和v-leave-to的状态一般情况下是一样的, 所以可以将两个类样式一起定义

v-enter-active和v-leave-active也是一样的, 所以也可以一起定义

v-enter-to和v-leave可以不用定义

自定义动画类名的前缀:

在transition标签中添加 name 属性表示自定义前缀

	<style>
		.v-enter,
		.v-leave-to {}

		.my-enter,
		.my-leave-to {}
	</style>

	<transition name="my"></transition>

结合第三方库完成动画:

在transition标签中添加 `enter-active-class`和`leave-active-class`属性来定义入场动画和离场动画的类名

	<transition 
		enter-active-class="animated bounceIn"
		leave-active-class="animated bounceOut"></transition>

可以结合Animate.css中预定义好的类样式完成更炫酷的动画

自定义动画执行市场:

在transition标签中添加 `:duration` 属性, 注意要使用属性绑定来定义

	<transition :duration="500"></transition>

也可以分别定义入场和离场

	<transition :duration="{ enter: 200, leave: 500 }"></transition>