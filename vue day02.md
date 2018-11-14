## vue day02 ##

### v-for中key的使用 ###

在使用v-for渲染列表时, 如果涉及到数据顺序变化, 那么跟随数据的一些状态(例如: 勾选状态), 默认情况下不会跟随数据的顺序改变而改变, 也是vue默认的策略: 就地复用, 好处: 可以提高效率减少DOM操作, 问题: 一旦数据的顺序发生变化了, 状态不会随着数据改变而跟随着改变, 依旧会根据索引去勾选原位置的数据

key的出现就是为了告诉vue, 数据与DOM元素直接的对应关系, 当数据的顺序发生变化时, vue就会自动帮我们重排

所以需要为每项提供一个**唯一的**key属性

记住: 以后使用v-for的时候 加上 :key="item.id"

### 条件渲染 ###

v-if : 如果满足条件才会进行DOM渲染, 如果不满足条件, 元素都不会创建, 但是频繁切换元素的显示隐藏需要消耗更多的性能, 因为v-if每次切换都会移除元素后新建

v-show : 不管满不满足条件都会进行DOM渲染, 但是不会移除DOM元素

v-if适合使用在不需要频繁切换显示隐藏的元素身上

### 过滤器 ###

过滤器只是为了做渲染输出前的最后一道处理, 一般用字符串的操作, 不要在过滤器的处理函数中做大量的业务逻辑操作

全局过滤器的使用方法:

1. 定义全局过滤器

	参数1: 过滤器的名称

	参数2: 过滤器的处理函数

	过滤器的处理函数中, 第一个参数永远都是管道符左侧的数据(也就是要处理的数据)

	处理函数的返回值就是最终处理好的数据

		Vue.filter('moneyFormat', function(msg) {
			return '$' + msg
		})

2. 使用过滤器

	在插值表达式中渲染数据时, 后面使用管道符 | 连接过滤器, 过滤器会将数据处理完毕后返回并渲染

		<p>{{ msg | moneyFormat }}</p>

3. 过滤器也可以传参数

		<p>{{ msg | moneyFormat('￥') }}</p>

		Vue.filter('moneyFormat', function(msg, argument) {
			return argument + msg
		})

4. 过滤器也可以多次过滤

		<p>{{ msg | moneyFormat('￥') | 过滤器的名称... }}</p>

私有过滤器用法:

和全局作用域唯一的区别就是定义方式不同, 私有过滤器需要在vm实例的配置对象中添加一个filters属性, 该属性对应的也是一个对象

	var vm = new Vue({
		el: '#app',
		data: {},
		methods: {},
		// 该属性配置的就是当前vm实例可用的过滤器, 其他vm实例是不可用的
		filters: {  
			// 定义方式和全局一样, 需要有过滤器名称(函数名称就是过滤器名称)
			dateFormat(msg) {
				// 该函数的第一个参数同样是管道符左边的数据
			}
		}
	})

如果私有过滤器和全局过滤器重名, 私有过滤器优先, 就近原则

### 按键修饰符 ###

- 全部的按键别名：

		.enter
		.tab
		.delete (捕获“删除”和“退格”键)
		.esc
		.space
		.up
		.down
		.left
		.right

如果不够用, 可以自定义按键别名

	Vue.config.keyCodes.f2 = 113

按键修饰符的使用:

	// 如果不加按键修饰符表示只要任意键抬起都会触发事件
	// 加了enter按键修饰符的意思就是, 只有在按enter键的时候才会触发该事件
	<input type="text" @keyup.enter="add" />
	<input type="text" @keyup.f2="add" />

### 自定义指令 (了解内容) ###

	v-text
	v-html
	v-bind
	v-on
	v-model
	v-cloak
	v-for
	v-if
	v-show

以上指令都是vue提供的内置指令, 如果我们需要自己在标签上加一个 v-lxh 当div显示到页面上时就变绿了! 如何实现?

	<div v-lxh></div>

自定义指令

当页面加载就让某个表单元素获取焦点

1. 定义全局自定义指令

	参数1: 指令名

	参数2: 对象, 对象中存储着一些回调函数(钩子函数)

		Vue.directive('focus', {
			//　当指令绑定到标签元素时执行, 此时DOM元素还没有渲染到页面上
			// 钩子函数的第一个参数就是当前指令绑定的元素对象, 原生的DOM元素对象, 可以直接操作
			bind: function(el) {

			},

			// 当元素渲染到页面时调用
			inserted: function(el) {
				el.focus()
			}
		})

2. 使用

		<input type="text" v-focus />

定义私有的自定义指令

其他地方和全局自定义指令一样, 只有定义的时候, 将指令定义在vm的配置对象中的 directives 上即可


	var vm2 = new Vue({
      el: '#app2',
      data: {},
      methods: {},
      directives: { // 自定义私有指令
        'fontweight': { // 设置字体粗细的
          bind: function (el, binding) {
            el.style.fontWeight = binding.value
          }
        },
        'fontsize': function (el, binding) { // 注意：这个 function 等同于 把 代码写到了 bind 和 update 中去
          el.style.fontSize = parseInt(binding.value) + 'px'
        }
      }
    })