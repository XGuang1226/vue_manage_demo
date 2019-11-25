<template>
	<div class="menu-bar-container">
    <!-- logo -->
    <div class="logo" :style="{'background-color':themeColor}" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'">
        <img src="@/assets/logo.png"/> <div>{{collapse?'':appName}}</div>
    </div>
    <!-- 导航菜单 -->
    <el-menu default-active="1" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
      :collapse="collapse" @open="handleopen" @close="handleclose" @select="handleselect">
      <!-- 导航菜单树组件，动态加载菜单 -->
      <menu-tree v-for="item in menuTree" :key="item.menuId" :menu="item"></menu-tree>
    </el-menu>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { isURL } from '@/utils/validate'
import MenuTree from "@/components/MenuTree/index"
export default {
  components:{
        MenuTree
  },
  methods: {
    handleopen() {
      console.log('handleopen');
    },
    handleclose() {
      console.log('handleclose');
    },
    handleselect(a, b) {
      console.log('handleselect');
    },
    /**
     * 添加动态(菜单)路由
     * @param {*} menuList 菜单列表
     * @param {*} routes 递归创建的动态(菜单)路由
     */
    addDynamicMenuRoutes (menuList = [], routes = []) {
      var temp = []
      for (var i = 0; i < menuList.length; i++) {
        if (menuList[i].children && menuList[i].children.length >= 1) {
          temp = temp.concat(menuList[i].children)
        } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
          menuList[i].url = menuList[i].url.replace(/^\//, '')
          // 创建路由配置
          var route = {
            path: menuList[i].url,
            component: null,
            name: menuList[i].name,
            meta: {
              menuId: menuList[i].menuId,
              title: menuList[i].name,
              isDynamic: true,
              isTab: true,
              iframeUrl: ''
            }
          }
          // url以http[s]://开头, 通过iframe展示
          if (isURL(menuList[i].url)) {
            route['path'] = menuList[i].url
            route['name'] = menuList[i].name
            route['meta']['iframeUrl'] = menuList[i].url
          } else {
            try {
              // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
              // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
              let array = menuList[i].url.split('/')
              let url = array[0].substring(0,1).toUpperCase()+array[0].substring(1) + '/' + array[1].substring(0,1).toUpperCase()+array[1]  .substring(1)
              route['component'] = resolve => require([`@/views/${url}`], resolve)
            } catch (e) {}
          }
          routes.push(route)
        }
      }
      if (temp.length >= 1) {
        this.addDynamicMenuRoutes(temp, routes)
      } else {
        console.log(routes)
      }
      return routes
    },
    // 加载导航菜单
    findMenuTree() {
      this.$api.menu.findMenuTree()
      .then( (res) => {
        this.$store.commit('setMenuTree', res.data)
        // 添加动态路由
        let routes = this.addDynamicMenuRoutes(res.data)
        for(var i = 0; i < routes.length; i++) {
          this.$router.options.routes[0].children.push(routes[i])
        }
        this.$router.addRoutes(this.$router.options.routes);
      })
      .catch(function(res) {
        alert(res);
      });
    }
  },
  computed: {
    ...mapState({
      appName: state=>state.app.appName,
      themeColor: state=>state.app.themeColor,
      collapse: state=>state.app.collapse,
      menuTree: state=>state.menu.menuTree
    })
  },
  mounted: function() {
    this.findMenuTree()
  }
};
</script>

<style scoped lang="scss">
.menu-bar-container {
  .el-menu {
    position:absolute;
    top: 60px;
    bottom: 0px;
    text-align: left;
  }
  .logo {
    position:absolute;
    top: 0px;
    height: 60px;   
    line-height: 60px;
    background: #545c64;
    img {
        width: 40px;
        height: 40px;
        border-radius: 0px;
        margin: 10px 10px 10px 10px;
        float: left;
    }
    div {
      font-size: 22px;
      color: white;
      text-align: left;
    }
  }
  .menu-bar-width {
    width: 200px;
  }
  .menu-bar-collapse-width {
    width: 65px;
  }
}

</style>