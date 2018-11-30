<template>
    <div class="home.contain">
        头部
    </div>
</template>

<script>
import { getUserList } from "@/app/axios.js"
export default {
    data(){
        return {

        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        //获取数据
        getData(){
            let params = { params : {query:"",pagenum:1,pagesize:1} }
            getUserList(params).then(res => {
                console.log(res)
            })
        }
    }
}
</script>

<style>

</style>
