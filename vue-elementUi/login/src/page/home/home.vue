<template>
    <div class="home-contain">
        <el-container>
            <el-aside width="auto">
                 
                 <div class="log" >
                    兔子商城
                  </div>
                  <el-menu
                      default-active="2"
                      class="el-menu-vertical-demo"
                      @open="handleOpen"
                      @close="handleClose"
                      :collapse="isCollapse"
                      background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b"
                     >
                      <el-submenu index="1">
                        <template slot="title">
                          <i class="el-icon-location"></i>
                          <span>用户管理</span>
                        </template>
                         <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">用户列表</span>
                        </el-menu-item>
                      </el-submenu>

                    </el-menu>
            </el-aside>
            <el-container>
              <el-header>
                  <el-button type="warning" icon="el-icon-star-off" circle class="btn" @click="shrink"></el-button>
                  <h1 class="title">后台管理系统</h1>
                  <div class="right">
                      <span class="user">你好, {{$stort.getters.username}}</span>
                       <el-button type="danger" plain @click="logout">退出</el-button>
                  </div>
              </el-header>
              <el-main>
                  <router-view></router-view>
              </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { getUserList } from "@/app/axios.js"

export default {
    data(){
        return {
            isCollapse: false
        }
    },
    mounted(){
        this.getData()
    },
    updated() {
        
    },
    methods:{
        //获取数据
        getData(){
            let params = { params : {query:"",pagenum:1,pagesize:1} }
            getUserList(params).then(res => {
                console.log(res)
            })
        },
        //
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //侧边栏收缩
      shrink(){
          let log = document.querySelector(".log")
          this.isCollapse = !this.isCollapse;
          if(this.isCollapse){
            log.style.fontSize = "15px";
            log.style.transition = "2s";
          }else{
              log.style.fontSize = "30px";
          }
          
      },
    //   退出登录
      logout(){
          localStorage.removeItem("token");
          this.$message({message: '退出成功',type: 'success',center:true})
          this.$router.push("/login")
      }
    }
}
</script>

<style lang="less">
    .home-contain{
        height: 100%;
        .el-container{
            // display: flex;
            height: 800px;
        .el-header, .el-footer {
          background-color: #B3C0D1;
          color: #333;
          text-align: center;
        }

        .el-aside {
          background-color: #D3DCE6;
          color: #333;
          text-align: center;
            .log{
                height: 60px;
                line-height: 60px;
                color: orange;
                font-size: 30px;
            }
        }
        .el-main {
          background-color: #E9EEF3;
          color: #333;
        }
        .el-header{
            line-height: 60px;
            display: flex;
            justify-content:space-between;
            .title{
                font-size: 30px;
            }
            .btn{
                padding: 20px;
            }
        }
        }
       
    }
</style>
