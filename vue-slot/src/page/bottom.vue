<template>
    <base-add-view size="small" title="这是一个标题">
        <div slot="sl">你好 {{app.userInfo}} {{app.page}}</div>
    </base-add-view>
    
    <!-- <i-button disabled></i-button> -->
</template>

<script>
// import BaseAddView from '@/components/BaseAddView.vue'
export default {
    components: {
        // BaseAddView
    },
    inject: ['app'],
    created() {
        // console.log(app.userInfo);
    }
}
</script>
