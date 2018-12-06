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
            <el-table-column type="expand" >
                <template slot-scope="scope" >
                   <el-row v-for="first in scope.row.children" :key="first.id">
                        <el-col :span="4" class="first"><el-tag  closable @close="delRoles(scope.row,first.id)">{{first.authName}}</el-tag> <span class="el-icon-arrow-right"></span>  </el-col>
                        <el-col :span="20">
                            <el-row v-for="second in first.children" :key="second.id" class="second">
                                <el-col :span="4"><el-tag type="success"  closable @close="delRoles(scope.row,second.id)">{{second.authName}}</el-tag> <span class="el-icon-arrow-right"></span></el-col>
                                <el-col :span="20" ><el-tag type="warning" @close="delRoles(scope.row,third.id)" closable v-for="third in second.children" :key="third.id">{{third.authName}}</el-tag></el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row v-if="scope.row.children.length == 0">
                        <el-col :span="24">
                            <el-tag type="danger">不好意思,权限列表为空</el-tag>
                        </el-col>  
                    </el-row>
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
                    <el-button  type="success" icon="el-icon-check" circle plain @click="showDialog(scope.row)"></el-button>       
                </template>
            </el-table-column>
        </el-table>

        <!-- 弹出层 -->
        <el-dialog
            title="权限列表"
            :visible.sync="centerDialogVisible"
            width="50%"
            center>
            <el-tree
                :data="rightTree"
                empty-text="内容为空"
                show-checkbox
                node-key="id"
                ref="tree"
               :default-expand-all = true
                :default-checked-keys="selectId"
                :props="defaultProps">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="getCheckedKeys">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getRolesList, deleteRoles, getRights, authUser } from "@/app/axios.js"
export default {
    data(){
        return {
            rolesInfo: [], //获取角色列表数据
            centerDialogVisible: false, //默认隐藏
            rightTree: [], //获取权限列表
            authId:null, //获取当前点击id
            row:{}, //保存点击的角色
            selectId: [],
            defaultProps: {  //设置树的子元素名和要显示的标签名
            children: 'children',
            label: 'authName'
            }
        }
    },
    created(){
        this.getrolesInfo()

    },
    methods:{
        //获取用户列表数据
        getrolesInfo(){
            getRolesList().then(res=>{
                if(res.meta.status == 200){
                    this.rolesInfo = res.data
                    // console.log( this.rolesInfo)
                }
            })
        },
        //删除用户权限
        delRoles(row, rightId){
            deleteRoles({roleId:row.id,rightId:rightId}).then(res => {
                if(res.meta.status == 200){
                    row.children = res.data
                    this.$message({message:"删除成功", type:"success"})
                }else{
                    this.$message({message:"删除失败", type:"error"})
                }
            })
          
        },
        //显示弹出框
        showDialog(row){
            this.row = row //保存点击的角色
            this.centerDialogVisible = true
            //获取权限列表
            getRights({type:"tree"}).then(res => {
                if(res.meta.status == 200){
                    this.rightTree = res.data
                }else{
                    this.$message({message:"获取数据失败", type:"error"})
                }
            })
            //循环遍历,得到权限对应的id值
            this.selectId.length = 0
            row.children.forEach(first => {
                if(!(first && first.length !== 0)) return;
                first.children.forEach(second => {
                    if(!(second && second.length !== 0)) return;
                    second.children.forEach(third => {
                        if(!(third && third.length !== 0))  return;
                        this.selectId.push(third.id) 
                    })
                })
            })
        },
        //角色授权
        getCheckedKeys() {
            // console.log(this.row.id)
           let rids = this.$refs.tree.getCheckedKeys().join(",");
           authUser(this.row.id, {rids : rids}).then(res => {
            //    console.log(authId)
                if(res.meta.status == 200){
                    // console.log(res)
                    this.$message({message:"更改成功", type:"success"})
                }
               this.getrolesInfo()
               this.centerDialogVisible = false
           })
      },
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
        .first .el-tag{
            margin: 5px, 0;
        }
        .second span{
            margin: 2px 1px;
        }
    }
</style>
