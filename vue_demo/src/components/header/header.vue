<template>
    <div class="header" title="title">
       <!-- <span class="left">
           <i class="iconfont icon-sousuo"></i>
       </span> -->
       <slot name="left"></slot>
        <!-- <span class="content">{{title}}</span> -->
        <slot name="right"></slot>
        <!-- <span class="right">
            <a href="javascript:;">登录</a>|<a href="javascript:;">注册</a>
        </span> -->
    </div>
</template>

<script>
    export default {
        props: {
            title: String
        }
    }
</script>

<style lang="less" scoped>
    .header{
        position: fixed;
        top: 0;
        height: 40px;
        width: 100%;
        background-color: orange;
        line-height: 30px;
        padding: 5px 20px;
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        margin: 0 auto;
        color: white;
        .left{
            flex: 1;
            color: white;
            i{
                font-size: 20px;
            }
        }
        .right{
            flex: 1;
            text-align: right;
            font-size: 15px;
            a{
                color: white;
            }
        }
        .content{
            flex: 2;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
</style>

