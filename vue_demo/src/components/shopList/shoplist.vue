<template>
     <div class="shops_content_list">
                     <div class="shops_left">
                         <img src="./images/nav1.png" alt="">
                    </div>
                    <div class="shops_center">
                        <div class="shops_center_top">
                            <i>品牌</i> 锄禾日当午,旱地禾下土
                        </div>
                        <div class="shops_center_center">
                            <span>☆☆☆☆☆</span> <span>2.3</span><span>月售100件</span>
                        </div>
                        <div class="shops_center_bottom">
                            <span>$20起送</span>/<span>配送费5元</span>   
                        </div>
                    </div>
                    <div class="shops_right">
                        <p class="shops_right_top">包准时</p>
                        <p class="shops_right_center">进行专送</p>
                    </div>
                </div>
</template>

<script>
    
</script>

<style lang="less">
     //附近商家详细信息
    .shops_content_list{
        display: flex;

        .shops_left{
            flex: 1;
           text-align: center;
            img{
                width:60%;
                margin: 0 auto;
            }
        }
        .shops_center{
            flex: 2;
            .shops_center_top{
                overflow: hidden;
                 white-space: nowrap;
                text-overflow: ellipsis;
                height: 25px;
                i{
                    font-style: normal;
                    background-color: orange;
                    font-size: 12px;
                }
            }
            .shops_center_center{
                font-size: 12px;
                height: 25px;
                color: orange;
            }
            .shops_center_bottom{
                font-size: 13px;

            }
        }
        .shops_right{
            flex: 1;
            text-align: center;
            .shops_right_top{
                height: 30px;   
            }
            .shops_right_center{
                font-size: 14px;
                color: skyblue;
            }
        }
    }
</style>