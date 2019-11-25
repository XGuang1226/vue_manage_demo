<template>
	<div class="menu-bar-container">
    <!-- logo -->
    <div class="logo" :style="{'background-color':themeColor}" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'">
        <img src="@/assets/logo.png"/> <div>{{collapse?'':appName}}</div>
    </div>
    <!-- 导航菜单 -->
    <el-menu default-active="1-1" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
      :collapse="collapse" @open="handleopen" @close="handleclose" @select="handleselect">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{$t("sys.sysMng")}}</span>
        </template>
        <el-menu-item index="1-1" @click="$router.push('user')">{{$t("sys.userMng")}}</el-menu-item>
        <el-menu-item index="1-2" @click="$router.push('dept')">{{$t("sys.deptMng")}}</el-menu-item>
        <el-menu-item index="1-3" @click="$router.push('role')">{{$t("sys.roleMng")}}</el-menu-item>
        <el-menu-item index="1-4" @click="$router.push('menu')">{{$t("sys.menuMng")}}</el-menu-item>
        <el-menu-item index="1-5" @click="$router.push('log')">{{$t("sys.logMng")}}</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{$t("sys.sysMonitor")}}</span>
        </template>
      </el-submenu>
    </el-menu>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
    };
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
    }
  },
  computed:{
    ...mapState({
      appName: state=>state.app.appName,
      themeColor: state=>state.app.themeColor,
      collapse: state=>state.app.collapse
    })
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