<template>
  <div>
    <button :class="'i-button-size' + size" :disabled="disabled">
      <slot name="sl"></slot> 
    </button>
    <div>{{title}} {{app.userInfo}}</div>
  </div>
  
</template>
<script>
  // 判断参数是否是其中之一
  function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true;
      }
    }
    return false;
  }

  export default {
    inject: ['app'],
    props: {
      size: {
        validator (value) {
          return oneOf(value, ['small', 'large', 'default']);
        },
        default: 'default'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      title: { type: String, default: '请添加标题' }
    }
  }
</script>