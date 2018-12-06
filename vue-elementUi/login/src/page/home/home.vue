<template>
    <div class="home-contain">
        <el-container>
            <el-aside width="200px">
                 <div class="log" >
                    兔子商城
                  </div>
                  <el-menu
                      :unique-opened="true"
                      default-active="1"
                      class="el-menu-vertical-demo"
                      @open="handleOpen"
                      @close="handleClose"
                      :collapse="isCollapse"
                      background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b"
                     :router="true"
                     >
                      <el-submenu :index="String(first.order)" v-for="first in menusList" :key="first.id">
                        <template slot="title" >
                          <i class="el-icon-location"></i>
                          <span>{{first.authName}}</span>
                        </template>
                         <el-menu-item :index="second.path" class="home-item" v-for="second in first.children" :key="second.id">
                            <i class="el-icon-menu"></i>
                            <span slot="title" >{{second.authName}}</span>
                        </el-menu-item>
                      </el-submenu>
                      <!-- <el-submenu index="2">
                        <template slot="title">
                          <i class="el-icon-location"></i>
                          <span>权限管理</span>
                        </template>
                         <el-menu-item index="rights" class="home-item">
                            <i class="el-icon-menu"></i>
                            <span slot="title" >权限列表</span>
                        </el-menu-item>
                        <el-menu-item index="roles" class="home-item">
                            <i class="el-icon-menu"></i>
                            <span slot="title" >角色列表</span>
                        </el-menu-item>
                      </el-submenu> -->
                    </el-menu>
            </el-aside>
            <el-container>
              <el-header>
                  <el-button type="warning" icon="el-icon-star-off" circle class="btn" @click="shrink"></el-button>
                  <h1 class="title">后台管理系统</h1>
                  <div class="right">
                      <span class="user">你好, {{$store.getters.username}}</span>
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
import { getUserList, getMenus } from "@/app/axios.js"

export default {
    data(){
        return {
            isCollapse: false,
            menusList: []
        }
    },
    created(){
        this.getMenusList()
    },
    mounted(){
       
    },
    updated() {
        
    },
    methods:{
        //获取菜单列表
        getMenusList(){
            getMenus().then(res =>{
                console.log(res)
                if(res.meta.status == 200){
                    this.menusList = res.data
                    console.log(this.menusList)
                }
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
          this.isCollapse = !this.isCollapse;  
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
        .home-item{
            margin-left: 10px;
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
