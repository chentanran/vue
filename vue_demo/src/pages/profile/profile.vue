<template>
    <div>
        <headers title="个人中心"></headers> 
        <div class="profile_contain">
            <div class="user">
                <div class="user_left">
                    <img src="./images/user.jpg" alt="">
                </div>
                <div class="user_center">
                    <p class="user_center_top">
                        <a href="#/login">登录</a>/
                        <a href="javascript:;">注册</a>
                    </p>
                    <p class="user_center_bottom">
                        <i class="iconfont icon-tishi"></i>
                        <span>暂无绑定手机号</span>
                    </p>
                </div>
                <div class="user_right">
                    <i class="iconfont icon-xiangyoujiantou"></i>
                </div>
            </div>
            <div class="info">
                <div class="info_left">
                    <span>0.00</span>元
                    <p>我的余额</p>
                </div>
                <div class="info_left">
                     <span>0</span>个
                    <p>我的优惠</p>
                </div>
                <div class="info_left">
                     <span>0</span>分
                    <p>我的积分</p>
                </div>
            </div>
            <div class="order">
                <ul>
                    <li>
                        <span><i class="iconfont icon-wodedingdan"></i>我的订单</span><i class="iconfont icon-xiangyoujiantou"></i>
                    </li>
                     <li>
                        <span><i class="iconfont icon-wodedingdan"></i>我的订单 </span><i class="iconfont icon-xiangyoujiantou"></i>
                    </li>
                     <li>
                        <span><i class="iconfont icon-wodedingdan"></i>我的订单 </span><i class="iconfont icon-xiangyoujiantou"></i>
                    </li>
                </ul>
            </div>
            <div class="serve">
                <a href="javascript:;">
                   <span> <i class="iconfont icon-wodefankui"></i>
                    服务中心</span>
                    <i class="iconfont icon-xiangyoujiantou"></i>
                </a>
            </div>
        </div>
    </div>    
</template>

<script>
    import headers from "../../components/header/header.vue"

    export default {
        components: {
            headers
        }
    }
</script>

<style lang="less" scoped>
    .profile_contain{
        margin-top: 41px;
        //头部
        .user{
            height: 120px;
            width: 100%;
            background-color: orange;
            padding: 0 20px;
            // line-height: 120px;
            display: flex;
            .user_left{
                flex: 1;
                img{
                    margin-top: 27px;
                    // transform: translateY(-50%);
                    width: 70%;
                }
            }
            .user_center{
                flex: 2;
                padding-top: 20px; 
                box-sizing: border-box;
                .user_center_top{
                    height: 50px;
                    color: white;
                    line-height: 50px;
                    a{
                        color: white;
                        font-size: 20px;
                    }
                }
                .user_center_bottom{
                    color: white;

                }
            }
            .user_right{
                flex: 1;
                text-align: right;
                line-height: 120px;
                color: white;
            }
        }
        //余额区
        .info{
            display: flex;
            text-align: center;
            .info_left{
                flex: 1;
                padding: 15px 0;
                border-right: .5px solid #ccc; 
                border-bottom: .5px solid #ccc;
                &:last-of-type{
                     border-right: none;
                }
                span{
                    color: orange;
                    font-size: 20px;
                    // padding-bottom: 10px;
                }
                p{
                    margin-top: 10px;
                }
            }

        }
        //order
        .order{
            margin: 20px 0;
            ul{
                &:first-of-type{
                        border-top: .5px solid #ccc;
                    }
                li{
                    
                    padding: 20px 10px;
                    display: flex;
                    justify-content: space-between;
                    border-bottom: .5px solid #ccc; 
                    span{

                        i{
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
        // 服务中心
        .serve{
              padding: 20px 10px;
                   
                    border-top: .5px solid #ccc;
                    border-bottom: .5px solid #ccc; 
                    a{
                        display: block;
                         display: flex;
                    justify-content: space-between;
                        span{
                        i{
                            margin-right: 10px;
                        }
                    }
                    }
                   
                }
        
    }
</style>