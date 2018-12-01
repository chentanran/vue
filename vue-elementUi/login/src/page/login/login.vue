<template>
    <div class="login-contain">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item  prop="username">
            <el-input v-model="form.username" placeholder="账户"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
            <el-input v-model="form.password" type="password" placeholder="密码" v-on:keyup.enter.native="submitForm('form')"></el-input>
        </el-form-item>
        <el-form-item class="btn">
            <el-button type="primary" @click="submitForm('form')"  round class="btn1">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import  { checkUser } from "@/app/axios.js"
    export default {
        data() {
          return {
            form: {
              username: '',
              password: "",
            },
            rules: {
                username: [
                  { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                  { required: true, message: '请输入密码', trigger: 'blur' }
                ],
            }
          }
        },
        methods: {
          submitForm(formName) {
              this.$refs[formName].validate((valid) => {
                  if(valid){
                      checkUser(this.form).then(res=>{
                          if(res.meta.status == 200){
                              this.$message({message:'登录成功',type : "success"});
                              localStorage.setItem("token", res.data.token)
                              localStorage.setItem("username", res.data.username)
                              this.$store.commit("setUsername",res.data.username)  
                              this.$router.push("/home")
                          }else{
                              this.$message({ message: res.meta.msg, type : "error"});
                          }
                      })
                  }else{
                      console.log("")
                  }
              })
          }
        }
    }
</script>

<style lang="less">
    .login-contain{
        width: 400px;
        margin: 200px auto;
        .btn{
            text-align:center;
            .btn1{
                width: 100%;
            }
        }
    }
</style>