<template>
<div>
   <router-view></router-view>
   <footerGuide></footerGuide>  
</div>
</template>

<script>
    import footerGuide from "./components/footerGuide/footerGuide.vue"

    export default {
        components: {
            footerGuide
        }
    }
</script>

<style lang="less" scoped>
    div{
        height: 50px;
        header{
            color: red;
        }
    }
</style>


