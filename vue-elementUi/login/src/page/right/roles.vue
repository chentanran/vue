<template>
    <div class="roles-contain">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary" plain class="roles-btn">添加角色</el-button>
        <!-- 表格 -->
         <!-- 表格 -->
        <el-table
            :data="rolesInfo"
            border
            style="width: 100%">
            <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <span>你好啊</span>
                <!-- <el-form-item label="商品名称">
                    <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所属店铺">
                    <span>{{ props.row.shop }}</span>
                </el-form-item>
                <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                    <span>{{ props.row.shopId }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                    <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                    <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                    <span>{{ props.row.desc }}</span>
                </el-form-item> -->
                </el-form>
            </template>
            </el-table-column>
            <el-table-column
            label="角色名称"
            prop="roleName">
            </el-table-column>
            <el-table-column
            label="描述"
            prop="roleDesc">
            </el-table-column>
            <el-table-column
            label="操作"
            >
                <template slot-scope="scope">
                    <el-button  type="primary" icon="el-icon-edit" circle plain ></el-button>
                    <el-button  type="danger" icon="el-icon-delete" circle plain ></el-button>
                    <el-button  type="success" icon="el-icon-check" circle plain ></el-button>       
                </template>
        </el-table-column>
  </el-table>
    </div>
</template>

<script>
import { getRolesList } from "@/app/axios.js"
export default {
    data(){
        return {
            rolesInfo: [], //获取角色列表数据
        }
    },
    created(){
        this.getrolesInfo()
    },
    methods:{
        //获取用户列表数据
        getrolesInfo(){
            getRolesList().then(res=>{
                // console.log(res)
                if(res.meta.status == 200){
                    this.rolesInfo = res.data
                }
            })
        }
    }
}
</script>

<style lang="less">
    .roles-contain{
        .nav{
            height: 40px;
            line-height: 40px;
            background-color: #D3DCE6;
            padding-left: 20px;
        }
        .roles-btn{
            margin: 5px 0;
        }
    }
</style>
