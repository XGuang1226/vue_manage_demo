//请求接口汇总模块，聚合模块API

import axios from './axios'
//单独导出
export const login=data=>{
    return axios({
        url:'/login',
        method:'post',
        data
    })
}
export const getUser=()=>{
    return axios({
        url:'/user',
        method:'get'
    })
}
export const getMenu=()=>{
    return axios({
        url:'/menu',
        method:'post',
        data
    })
}
//默认全部导出
export default{
    login,getUser,getMenu
}