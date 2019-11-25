import axios from '../axios'

/* 
 * 用户管理模块
 */

export const getUser = () => {
    return axios({
        url: '/user',
        method: 'get'
    })
}