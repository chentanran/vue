<template>
    <div class="categories-contain">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加按钮 -->
        <el-button type="primary" plain class="addbtn" @click="openBox">添加分类</el-button>
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
            :total=total>
        </el-pagination>
        <!-- 弹出框 -->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="分类名称" :label-width="formLabelWidth" prop="cat_name">
                <el-input v-model="form.cat_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="父级名称" :label-width="formLabelWidth">
                <el-cascader
                    :options="options"
                    :props = "props"
                    v-model="selectedOptions"
                    @change="handleChange">
                </el-cascader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCategoriesList('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import treeGrid from "@/components/TreeGrid/TreeGrid.vue"
import { getGoodsList, addCategories } from "@/app/axios.js"

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
            pagesize:10,
            total:null,
            dialogFormVisible : false,
            form: {  //获取表单数据
                cat_name: '',
                cat_pid : 0,
                cat_level: 0
                },
            formLabelWidth: '120px', 
            options:[],  //可选项数据源
            props:{
                value: "cat_id",
                label: "cat_name"
            },
            selectedOptions:[],  //存储级联选择器数据
            rules: {  //表单验证
                cat_name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ]
            }
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
                if(res.meta.status == 200){
                    this.dataSource = res.data.result
                    this.total = res.data.total
                }
            })
        },
        //获取级联选择器分类
        handleChange(value) {
            console.log(value);
        },
        //打开盒子
        openBox(){
            this.dialogFormVisible = true
            getGoodsList({type:"2"}).then(res => {
                console.log(res)
                if(res.meta.status == 200){
                    this.options = res.data
                }
            })
        },
        //添加分类列表
        addCategoriesList(form){
            this.$refs[form].validate((valid) => {
                if (valid) {
                //    console.log(this.form, this.selectedOptions)
                    if(this.selectedOptions.length == 0){
                        this.form.cat_pid = 0
                        this.form.cat_level = 0
                    }else if(this.selectedOptions.length == 1){
                        this.form.cat_pid = this.selectedOptions[0]
                        this.form.cat_level = 1
                    }else if(this.selectedOptions.length == 2){
                        this.form.cat_pid = this.selectedOptions[1]
                        this.form.cat_level = 2
                    }
                    addCategories(this.form).then(res => {
                        console.log(res)
                        if(res.meta.status == 201){
                            this.getGoodsData()
                            this.dialogFormVisible = false
                        }
                    })

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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
