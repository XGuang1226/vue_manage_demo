<template>
    <div>
        <h4>Login Page</h4>
        <el-button type="success" @click="login()">登录</el-button>
    </div>
</template>
<script>
import mock from '@/mock/index.js'
import Cookies from 'js-cookie'
import router from '@/router'
export default {
    name:'Login',
    methods:{
        login(){
            this.$api.login().then(function(res){
                alert(res.data.token)
                Cookies.set('token',res.data.token) //放置token到cookie
                router.push('/') //登录成功，跳转到主页
            }).catch(function(res){
                alert(res)
            })
        }
    }
}
</script>
<style scoped lang='scss'>
</style>