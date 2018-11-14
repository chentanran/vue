(function(){
  const MyPlugin = {};

  MyPlugin.install = function (Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function () {
      // 逻辑...
      console.log("这是一个全局方法")
    }
  
    // 2. 添加全局资源
    Vue.directive('my-directive', function(el, binding){
        // 逻辑...
        el.innerHTML = binding.value.toUpperCase();
      
    
    })
  
    // // 3. 注入组件
    // Vue.mixin({
    //   created: function () {
    //     // 逻辑...
    //   }
     
    // })
  
    // 4. 添加实例方法
    Vue.prototype.$myMethod = function (methodOptions) {
      // 逻辑...
      console.log("这是一个实例方法")
    }

   
  }
  window.MyPlugin = MyPlugin;
})()