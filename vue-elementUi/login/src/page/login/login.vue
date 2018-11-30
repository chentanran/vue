<template>
    <div class="login-contain">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名:" prop="username">
            <el-input v-model="form.username" placeholder="账户"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
            <el-input v-model="form.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item class="btn">
            <el-button type="primary" @click="onSubmit" size="" round class="btn1">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import "@/app/axios.js"
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
          onSubmit() {
            console.log('submit!');
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