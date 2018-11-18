<template>
   
    <div>
         <headers title="我是一只活蹦乱跳的兔子">
             <span class="left" slot="left">
                <i class="iconfont icon-sousuo"></i>
            </span>
            <span class="right" slot="right">
            <a href="javascript:;">登录</a>|<a href="javascript:;">注册</a>
        </span>
         </headers>
         <div class="content">
            <div class="swiper-container">  
                <div class=" swiper-wrapper ">
            <ul class=" swiper-slide ul">
                <li class="list ">
                    <a href="javascript:;">
                        <img src="./images/nav1.png" alt="">
                        <p>小小兔纸</p>
                    </a>
                </li>
                <li class="list">
                    <a href="javascript:;">
                        <img src="./images/nav1.png" alt="">
                        <p>小小兔纸</p>
                    </a>
                </li>
                <li class="list">
                    <a href="javascript:;">
                        <img src="./images/nav1.png" alt="">
                        <p>小小兔纸</p>
                    </a>
                </li>
                <li class="list">
                    <a href="javascript:;">
                        <img src="./images/nav1.png" alt="">
                        <p>小小兔纸</p>
                    </a>
                </li>
                <li class="list">
                    <a href="javascript:;">
                        <img src="./images/nav1.png" alt="">
                        <p>小小兔纸</p>
                    </a>
                </li>
                <li class="list">
                    <a href="javascript:;">
                        <img src="./images/nav1.png" alt="">
                        <p>小小兔纸</p>
                    </a>
                </li>
                <li class="list">
                    <a href="javascript:;">
                        <img src="./images/nav1.png" alt="">
                        <p>小小兔纸</p>
                    </a>
                </li>
                <li class="list">
                    <a href="javascript:;">
                        <img src="./images/nav1.png" alt="">
                        <p>小小兔纸</p>
                    </a>
                </li>
                </ul>
            <ul class=" swiper-slide ul">
                <li class="list swiper-slide">
                    <a href="javascript:;">
                        <img src="./images/nav1.png" alt="">
                        <p>小小兔纸</p>
                    </a>
                </li>
                <li class="list">
                    <a href="javascript:;">
                        <img src="./images/nav1.png" alt="">
                        <p>小小兔纸</p>
                    </a>
                </li>
                <li class="list">
                    <a href="javascript:;">
                        <img src="./images/nav1.png" alt="">
                        <p>小小兔纸</p>
                    </a>
                </li>
                <li class="list">
                    <a href="javascript:;">
                        <img src="./images/nav1.png" alt="">
                        <p>小小兔纸</p>
                    </a>
                </li>
                <li class="list">
                    <a href="javascript:;">
                        <img src="./images/nav1.png" alt="">
                        <p>小小兔纸</p>
                    </a>
                </li>
                <li class="list">
                    <a href="javascript:;">
                        <img src="./images/nav1.png" alt="">
                        <p>小小兔纸</p>
                    </a>
                </li>
                <li class="list">
                    <a href="javascript:;">
                        <img src="./images/nav1.png" alt="">
                        <p>小小兔纸</p>
                    </a>
                </li>
                <li class="list">
                    <a href="javascript:;">
                        <img src="./images/nav1.png" alt="">
                        <p>小小兔纸</p>
                    </a>
                </li>
            </ul>
            </div>
             <div class="swiper-pagination"></div>
            </div>
         </div>
         <div class="shops">
             <div class="shops_header">
                 <i>三</i> 附加商家
             </div>
             <div class="shops_content">
                 <shoplist></shoplist>   
                </div>
         </div>
    </div>    
</template>

<script>
import headers from "../../components/header/header.vue";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import shoplist from "../../components/shopList/shoplist.vue"

export default {
  mounted() {
    new Swiper(".swiper-container", {
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination"
      }
    });
  },
  components: {
    headers,
    shoplist
  }
};
</script>

<style lang="less" scoped>
    // 导航栏
    .content{
        margin-top: 40px;   
        .ul{
            display: flex;
             flex-wrap: wrap;
            .list{
            width: 25%;
            margin: 10px 0;
            a{
                width: 100%;
                // height: 100%;
                display: inline-block;
                text-align: center;
                img{
                    width: 50%;
                    margin: auto;
                }
                p{
                    text-align: center;
                    font-size: 12px;
                }
            }
        }

        }
       
    }
    // 附近商家头部
    .shops_header{
        padding-left: 20px;
        border-top: .5px solid #ccc;
        line-height: 30px;
    }
   
</style>