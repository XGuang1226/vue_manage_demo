import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Home from '@/views/Home'
import NotFound from '@/views/404'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
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
  if(to.path == '/login'){
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if(user){
      next({path:'/'})
    }else{
      next()
    }
  }else{
    // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
    if(!user){
      next({path:'/'})
    }else{
      next()
    }
  }
})

export default router
