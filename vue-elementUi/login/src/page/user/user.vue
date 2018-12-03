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
            <el-button type="success" plain @click="dialogFormVisible = true">添加</el-button>
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
                    <el-switch v-model="scope.row.mg_state" @change="changeStatus(scope)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button  type="primary" icon="el-icon-edit" circle plain @click="editUser(scope)"></el-button>
                    <el-button  type="danger" icon="el-icon-delete" circle plain @click="deleteUser(scope)"></el-button>
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
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>

        <!-- Form -->
        <!-- 添加用户 -->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form" :label-width="formLabelWidth" :rules="rules" ref="userform">
            <el-form-item label="用户名:" prop="username">
            <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
            <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
            <el-input v-model="form.email" autocomplete="off" type="email"></el-input>
            </el-form-item>
            <el-form-item label="电话:" prop="mobile">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser('userform')" >确 定</el-button>
        </div>
        </el-dialog>
         
          <!-- 编辑用户 -->
        <el-dialog title="收货地址" :visible.sync="editDialogFormVisible">
        <el-form :model="editForm" :label-width="formLabelWidth" :rules="rules" ref="edituser">
            <el-form-item label="用户名:" prop="username" >
            <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
            <el-input v-model="editForm.email" autocomplete="off" type="email"></el-input>
            </el-form-item>
            <el-form-item label="电话:" prop="mobile">
            <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="editDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUserinfo('edituser')" >确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
import { getUserList, changeStatus, addUser, getUserInfo, editUser, deleteUser} from "@/app/axios.js"

export default {
    data() {
     return {
        userInfo : [],  //列表数据
        query: "", //搜索用户
        pagesize: 10, //分页数量
        pagenum: 1, //当前页码
        total: 0, 
        dialogFormVisible: false,  //弹出添加框
        editDialogFormVisible: false,  //弹出编辑框
        form: {  //添加表单数据
          username: '',
          password: "",
          email: "",
          mobile: ""
        },
        editForm:{   //编辑表单数据
          username: '',
          email: "",
          mobile: "",
          id: ""
        },
        formLabelWidth: '120px',
        rules: {
         username: [
           { required: true, message: '请输入用户名', trigger: 'blur' },
         ],
         password: [
           { required: true, message: '请输入密码', trigger: 'blur' },
         ],
         email: [
           { required: true, message: '请输入邮箱', trigger: 'blur' },
           { type: 'email', required: true, message: '请输入正确格式', trigger: 'blur' }
         ],
         mobile: [
           { required: true, message: '请输入手机号', trigger: 'blur' },
         ],
        }
     }
        
    },
    created(){
        this.initList();
    },
    methods:{
        //设置每页显示几条
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pagesize = val;
            this.initList()
        },
        //设置当前第几页
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.pagenum = val
            this.initList()
        },
        //获取用户数据
        initList(){
            getUserList({params: {query: this.query, pagenum: this.pagenum, pagesize: this.pagesize}}).then((res)=>{
                // console.log(res)
                if(res.meta.status == 200){
                    this.userInfo = res.data.users;
                    this.total = res.data.total
                }
            })
        },
        //改变用户状态
        changeStatus(scope){
            // console.log(scope)
            changeStatus({uid:scope.row.id,type:scope.row.mg_state}).then(res=>{
                // console.log(res)
                if(res.meta.status == 200){
                    this.$message({message: "改变状态成功", type:"success"})
                }else{
                    this.$message({message:res.meta.msg, type:"error"})
                }
            })
        },
        //添加用户
        addUser(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                   addUser({username:this.form.username, password:this.form.password, email:this.form.email, mobile:this.form.mobile}).then(res=>{
                       console.log(res)
                       if(res.meta.status == 201){
                           this.dialogFormVisible = false
                           this.$message({message:"添加成功", type:"success"})
                           this.initList() //从新获取数据
                       }else{
                           this.$message({message:res.meta.msg, type:"error"})
                       }
                   })
                }else{
                    this.$message({message:"提交的数据错误", type: "error"})
                }
            })
        },
        // 获取要编辑用户
        editUser(scope){
            this.editDialogFormVisible = true
            getUserInfo(scope.row).then(res=>{
                if(res.meta.status == 200){
                    this.editForm.username = res.data.username
                    this.editForm.email = res.data.email
                    this.editForm.mobile = res.data.mobile
                    this.editForm.id = res.data.id
                }else{
                    this.$message({message:res.meta.msg, type:"error"})
                }
            })
           
        },
        //提交编辑用户
        editUserinfo(edituser){
            this.$refs[edituser].validate((valid)=>{
                if(valid){
                    editUser(this.editForm).then(res =>{
                        if(res.meta.status == 200){
                            this.editDialogFormVisible = false
                            this.$message({message:"编辑数据成功", type:"success"})
                            this.initList()
                        }else{
                            this.$message({message:"编辑失败", type:"error"})
                        }
                       
                    })
                }else{
                    this.$message({message:"编辑失败", type:"error"})
                    return false
                }
            })
        },
        //删除用户
        deleteUser(scope){
            // console.log(scope)
            deleteUser(scope.row).then(res => {
                console.log(res)
                if(res.meta.status == 200){
                    this.$message({message:"删除成功", type:"success"})
                    this.initList()
                }else{
                    this.$message({message: "删除失败", type:"error"})
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
