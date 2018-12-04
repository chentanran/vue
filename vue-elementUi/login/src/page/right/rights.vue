<template>
    <div class="rights-contain">
     <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
         <!-- 表格 -->
        <el-table
            v-loading="loading"
            :data="rightsInfo"
            border
            style="width: 100%">
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
            prop="authName"
            label="权限名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="path"
            label="路径"
            width="180">
            </el-table-column>
            <el-table-column
            label="层级">
                <template slot-scope="scope">
                    <span>{{scope.row.level | hierarchy}}</span>
                </template>
            </el-table-column>
        </el-table>    
    </div> 
</template>

<script>
import { getRights } from "@/app/axios.js"

export default {
    data(){
        return{
            rightsInfo : [],
            loading: true
        }
    },
    created(){
        getRights({type:"list"}).then(res => {
            console.log(res)
            if(res.meta.status == 200){
                this.loading = false
                this.rightsInfo = res.data
            }
        })
    },
    filters:{
        hierarchy : function(value){
            if(value == 0){
                return "一级"
            }else if(value == 1){
                return "二级"
            }else if(value == 2){
                return "三级"
            }
        }
    }
}
</script>

<style lang="less">
    .rights-contain{
        .nav{
            height: 40px;
            line-height: 40px;
            background-color: #D3DCE6;
            padding-left: 20px;
    }
    }
</style>
