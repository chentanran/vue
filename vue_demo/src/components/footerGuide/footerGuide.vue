<template>
    <div class="footer">
        <a href="javascript:;" class="item" :class="{on: '/msite'===$route.path}" @click="goto('/msite')">
           
            <span class="font">
                <i class="iconfont icon-shouye"></i>
            </span>
             <span>首页</span>
        </a>
        <a href="javascript:;" class="item" :class="{on: '/search'===$route.path}" @click="goto('/search')">
          
            <span class="font">
                <i class="iconfont icon-sousuo"></i>
            </span>
              <span>搜索</span>
        </a>
        <a href="javascript:;" class="item" :class="{on: '/order'===$route.path}" @click="goto('/order')">
           
            <span class="font">
                <i class="iconfont icon-wodedingdan"></i>
            </span>
             <span>订单</span>
        </a>
        <a href="javascript:;" class="item" :class="{on: '/profile'===$route.path}" @click="goto('/profile')">
           
            <span class="font">
                <i class="iconfont icon-wodejuhuasuan"></i>
            </span>
            <span>我的</span>
        </a>
    </div>    
</template>

<script>
   export default {
       methods:{
           goto(path){
               this.$router.replace(path);
           }
       }
   }
</script>

<style lang="less" scoped>
    .footer{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 40px;
        width: 100%;
        border-top: .5px solid #ccc;
        display: flex;
        // justify-content: around-between;
        .item{
            // position: relative;
            flex: 1;
            text-align:center;
            // line-height: 55px;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            span{
                height: 20px;
                line-height: 20px;
            }
            .font{
                display: inline-block;
                line-height: 25px;
                i{
                    font-size: 15px;
                }
            }
        }
    }
    .on{
        color: orange;
    }
</style>

