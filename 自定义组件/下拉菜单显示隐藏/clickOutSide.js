Vue.directive('clickoutside', {
  bind: function(el, binding, vnode) {
    function documentHandel(e) {
      if(el.contains(e.target)) {
        return false;
      }
      if(binding.expression) {
        binding.value(e);
      }
    }

    el._vueClickOutSide_ = documentHandel;
    document.addEventListener('click', documentHandel);
  },

  unbind: function(el, binding, vnode) {
    document.removeEventListener('click', el._vueClickOutSide_);
    delete el._vueClickOutSide_;
  }, 

  // update: function(el, binding, vnode) {
  //   function wahha(e) {
  //     console.log(wahha)
  //   }
  // },
})