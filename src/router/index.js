import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import NotFound from '@/views/404'
import Home from '@/views/Home'
import Main from '@/views/Main'
import User from '@/views/User'
import Menu from '@/views/Menu'




Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
        { path: '/main', component: Main, name: '系统介绍' },
        { path: '/user', component: User, name: '用户管理' },
        { path: '/menu', component: Menu, name: '菜单管理' }
      ]
    },
 
    {
      path: '/login',
      name: '登录',
      component: Login
    }
    ,{
      path: '/404',
      name: 'notFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  let user = sessionStorage.getItem('user');
  if (to.path == '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if(user) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
    if (!user) {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

export default router