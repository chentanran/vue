<template>
    <div class="categories-contain">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加按钮 -->
        <el-button type="primary" plain class="addbtn">添加</el-button>
        <!-- 表格 -->
         <tree-grid
            :treeStructure="true"
            :columns="columns"
            :data-source="dataSource"
            @deleteCate="deleteCategory"
            @editCate="editCategory"
         ></tree-grid>    
        <!-- 分页 -->
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="40">
        </el-pagination>
    </div>
</template>

<script>
import treeGrid from "@/components/TreeGrid/TreeGrid.vue"
import { getGoodsList } from "@/app/axios.js"

export default {
    components:{
        treeGrid
    },
    data(){
        return {
            dataSource: [], //数据源
            columns: [{
            text: '分类名称',
            dataIndex: 'cat_name',
            width: ''
            }, {
            text: '是否有效',
            dataIndex: 'cat_deleted',
            width: ''
            }, {
            text: '排序',
            dataIndex: 'cat_level',
            width: ''
            }],
            pagenum:1,
            pagesize:10
        }
    },
    created(){
        this.getGoodsData()
    },
    methods:{
        // 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pagenum = parseInt(val)
            this. getGoodsData()
        },
        // 树
         deleteCategory (cid) {
            console.log(cid)
        },
        editCategory (cid) {
            console.log(cid)
        },
        //获取商品数据列表
        getGoodsData(){
            getGoodsList({type:'3', pagenum:this.pagenum, pagesize:this.pagesize}).then(res => {
                // console.log(res)
                if(res.meta.status == 200){
                    this.dataSource = res.data.result
                    // console.log(res.data)
                }
            })
        }
    } 
}
</script>

<style lang="less">
    .categories-contain{
        .nav{
            height: 40px;
            line-height: 40px;
            background-color: #D3DCE6;
            padding-left: 20px;
        }
        .addbtn{
            margin: 3px 0;
        }
    }
</style>
