## vue day01 ##

### vue的使用步骤 ###

1. 导入js文件
2. 创建vm实例对象
3. 设置控制区域
4. enjoy

### VM实例的创建 ###

Vue是一个完全按照MVVM设计的框架

M: Model
V: View
VM: View Model

Model就是数据模型层, 在前端用于存储数据, MVVM的思想就是当Model存储数据后, 将数据渲染到指定的View区域, 当数据发生改变时也会自动同步到View区域, 这个操作是由VM层来控制的

	var vm = new Vue({
		el: '#app', // 指定要控制的区域, 传入选择器即可
		data: {  // Model层 前端存放数据用
			msg: '我是数据'
		}
	})

### 常用指令 ###

插值表达式:

	{{ }}

v-开头的都被成为vue内置指令

1. 渲染文本

		v-text

2. 渲染HTML

		v-html

3. 解决差值表达式闪烁的问题

		v-cloak

	css代码:

		<style>
		    [v-cloak] {
		      display: none;
		    }
		</style>

	HTML代码:

		<div id="app">
			<div v-cloak>{{ msg }}</div>
		</div>

	解决闪烁问题的思路: 将标签添加v-cloak属性, 给该标签添加样式为display: none, 当差值表达式有数据的时候就会将标签自动显示

	**注意: v-text和v-html会将标签内部的内容完全覆盖, 而插值表达式可以在前后拼接内容**

4. 绑定属性

		v-bind  简写  :

	HTML代码:

		<input type='text' v-bind:value='msg'/>

		<input type='text' :value='msg + "123"'/>

	绑定属性可以针对标签自带的属性, 也可以针对自定义属性

		<input type='text' :flag='msg' :value='msg + "123"'/>

	**注意: 以上的所有指令用到的msg都需要放到Vue实例的data属性中**

	vm实例代码:

		let vm = new Vue({
			el: '#app', // el对应的是vm的控制视图区域, 传入选择器即可
			data: { // data对应的是Model层, 也就是数据对象, 该页面所有的数据都会存放在该对象中
				msg: 'hello' // msg就是存储在这里
			}
		})

5. 绑定事件

		v-on  简写   @

	HTML代码:

		<button value='按钮' v-on:click="show" />

		<button value='按钮' @click="show" />

	vm实例对象:

		let vm = new Vue({
			el: '#app', // el对应的是vm的控制视图区域, 传入选择器即可
			data: { // data对应的是Model层, 也就是数据对象, 该页面所有的数据都会存放在该对象中
				msg: 'hello' // msg就是存储在这里
			},
			methods: {
				show: function() {
					alert('helloworld')
				}
			}
		})

### 在methods的函数中访问data的数据 ###

1. 在vm实例创建时, 会将methods和data对象中的所有成员挂载到vm实例本身
2. 在methods中所有的函数内部this都会指向vm实例
3. 所以需要在methods中的函数内部访问data中的xxx数据, 应该 this.xxx

### 事件修饰符 ###

事件修饰符需要加在绑定事件的后面

例如:

	<div @click.stop="divClickHandler"></div>

1. .stop

	阻止冒泡

2. .prevent

	阻止默认行为

3. .self

	只有点击自己的时候才会触发事件, 其他情况都不会触发(例如点击了子元素, 默认情况会冒泡到当前元素, 如果加了self事件修饰符则不会触发当前元素的事件)

4. .once

	只触发一次

5. .capture

	事件捕获

注意: 多个事件修饰符可以同时添加给一个事件, 例如: `@click.once.prevent` 表示点击事件只触发一次并阻止默认行为, 第二次点击既不会触发事件也不会阻止默认行为

### 双向数据绑定的指令 ###

在vue中实现双向数据绑定的指令只有:

	v-model

v-model指令也只能用在表单元素身上, 不需要像v-bind那样指定要绑定的属性, 因为v-model只能绑定表单元素的value属性, 所以用法如下:

	<input type="text" v-model="msg">

使用v-model绑定变量时一定要在data中先声明好变量

### 绑定class完成样式修改 ###

通过v-bind绑定class属性

1. 以前的使用方式, 不使用v-bind绑定, 适用于类样式固定的场景
2. 个别类样式需要根据标识符来切换, 例如active类样式, 推荐使用v-bind数组的方式来绑定

		<div :class="['red', 'thin', {active: flag}]"></div>

3. 很多类样式都需要根据标识符来切换, 推荐使用v-bind对象的方式来绑定

		<div :class="{red: true, thin: flag2, 'form-control': flag}"></div>

### 绑定style完成样式修改 ###

通过v-bind绑定style属性

1. 绑定对象

		<div :style="{ width: '200px', height: '300px', 'background-color': 'red', 'font-weight': 200 }"></div>

2. 绑定数组, 树中存放多个样式对象, 可以将多个样式对象的样式属性设置上去

### 循环渲染 ###

v-for指令

1. 循环数组
	
	数组有几个元素, 就会循环创建几个p标签
	普通数组:

		<p v-for="(item, index) in arr">{{ item }}</p>

	如果数组中存储的是对象

		<p v-for="(item, index) in arr">{{ item.name }}</p>


2. 循环对象

	对象有几个属性, 就会循环创建几个p标签

		<p v-for="(value, key) in obj">{{ value }}</p>

3. 迭代数字(从1开始)

	从1开始迭代循环到指定的值, 如果需要用到35-45之间的值

		<p v-for="count in 10">{{ count + 34 }}</p>