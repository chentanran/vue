<template>
    <div class="goods-contain">
        <!-- 步骤条 -->
        <el-steps :active="active" finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
            <el-step title="步骤 4"></el-step>
            <el-step title="步骤 5"></el-step>
        </el-steps>
        <!-- 标签页 -->
         <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
            <el-tab-pane label="基本参数" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="商品参数" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="商品属性" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="商品图片" name="fourth">
                <!-- 图片列表缩略图 -->
                <el-upload
                    class="upload-demo"
                    action="http://localhost:8888/api/private/v1/upload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :headers="headers()"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="fifth">定时任务补偿</el-tab-pane>
        </el-tabs>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            activeName : 'first',
            active: 0,
            
        }
    },
    updated() {
        
    },
    methods:{
        //步骤条和tab栏相关联
        handleClick(tab, event) {
        //  console.log(tab, event);
          switch(tab.name){
              case "first":
                   this.active = 0
                   break;
              case "second":
                    this.active = 1
                    break;
              case "third":
                    this.active = 2
                    break;
              case "fourth":
                    this.active = 3
                    break;
              case "fifth":
                    this.active = 4
                    break;
              default:
                    this.active = 0
                    break
          }
        },
        
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        //上传成功
        handleSuccess(response, file, fileList){
            console.log(response, file, fileList)
            if(response.meta.status == 200){
                this.$message({message:"上传成功", type:"success"})
            }
        },
        //设置头部信息
        headers(){
            let token = sessionStorage.getItem("token");
            return { Authorization:token }
        }
    }  
}
</script>

<style>

</style>
