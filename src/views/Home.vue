<template>
    <div>
        <h4>Home Page</h4>
        <el-button type="primary" @click="testAxios()">测试axios调用</el-button>

        <el-button type="warning" @click="getUser()">获取用户信息</el-button>
        <el-button type="danger" @click="getMenu()">获取菜单信息</el-button>
    </div>
</template>
<script>
import axios from 'axios'
import mock from '@/mock/index.js'
export default {
    name:'Home',
    methods:{
        testAxios(){
            axios.get('http://localhost:8080').then(function(res){
                alert(res.data);
            }).catch(function(res){
                alert(res)
            })
        },
        getUser(){
            axios.get('http://localhost:8080/user').then(function(res){
                alert(JSON.stringify(res.data));
            }).catch(function(res){
                alert(res);
            })
        },
        getMenu(){
            axios.get('http://localhost:8080/menu').then(function(res){
                alert(JSON.stringify(res.data));
            }).catch(function(res){
                alert(res);
            })
        }
    }
}
</script>
<style scoped lang='scss'>
