<template>
    <div class="user-contain">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索 -->
        <div class="btn">
            <el-input placeholder="请输入内容"  class="input-with-select" v-model="query" @keyup.native.enter="initList">
                <el-button slot="append" icon="el-icon-search" @click="initList"></el-button>
            </el-input>
            <el-button type="success" plain>成功按钮</el-button>
        </div>
        <!-- 表格 -->
        <el-table
            :data="userInfo"
            border
            style="width: 100%">
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
            prop="username"
            label="姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱"
            width="180">
            </el-table-column>
            <el-table-column
            prop="mobile"
            label="电话">
            </el-table-column>
            <el-table-column label="用户状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state"></el-switch>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button  type="primary" icon="el-icon-edit" circle plain></el-button>
                    <el-button  type="danger" icon="el-icon-delete" circle plain></el-button>
                    <el-button  type="success" icon="el-icon-check" circle plain></el-button>
                    
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[1, 2, 3, 4]"
                :page-size="1"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
         
    </div>
</template>

<script>
import { getUserList } from "@/app/axios.js"

export default {
    data() {
     return {
        userInfo : [],  //列表数据
        query: "", //搜索用户
        pagesize: 1, //分页数量
        pagenum: 1, //当前页码
        total: "",
     }

    },
    created(){
        this.initList();
    },
    methods:{
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val;
            this.initList()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val
            this.initList()
        },
        initList(){
            getUserList({params: {query: this.query, pagenum: this.pagenum, pagesize: this.pagesize}}).then((res)=>{
                console.log(res)
                if(res.meta.status == 200){
                    this.userInfo = res.data.users;
                    this.total = res.data.total
                }
            })
        }
    }
}
</script>

<style lang="less">
.user-contain{
    .nav{
        height: 40px;
        line-height: 40px;
        background-color: #D3DCE6;
        padding-left: 20px;
    }
    .btn{
       margin: 2px 0;
        background-color: rgb(233, 242, 247);
        .input-with-select{
            margin-right: 2px;
             width:450px;
            
        }
    }
    .page{
        background-color: #D3DCE6;
        margin: 2px;
        padding: 5px 10px;
    }
}
</style>
