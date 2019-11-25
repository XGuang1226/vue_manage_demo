<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="5" class="logo" :class="isCollapse?'logo-collapse-width':'logo-width'">
        <img :src="this.logo" /> {{isCollapse?sysName:sysName}}
			</el-col>
			<el-col :span="1">
				<div class="tools" @click.prevent="collapse">
					<i class="el-icon-menu"></i>
				</div>
					<!-- <i class="fa fa-align-justify"></i> -->
			</el-col>
			<el-col :span="10">
				<div class="hearNavBar">
          <el-menu :default-active="activeIndex" class="el-menu-demo" background-color="#4b5f6e" text-color="#fff"
              active-text-color="#ffd04b" mode="horizontal" @select="handleSelectHearNavBar">
            <el-menu-item index="1">{{$t("common.home")}}</el-menu-item>
            <el-menu-item index="2">{{$t("common.doc")}}</el-menu-item>
            <el-menu-item index="3">{{$t("common.msgCenter")}}</el-menu-item>
          </el-menu>
				</div>
			</el-col>
			<el-col :span="6" class="userinfo">
        <span class="el-dropdown-link">
          <ThemePicker></ThemePicker>
        </span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link lang-inner">
            <span id="language">中文</span><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh_cn:中文">中文</el-dropdown-item>
            <el-dropdown-item command="en_us:English">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.userAvatar" /> {{username}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>{{$t("common.myMsg")}}</el-dropdown-item>
						<el-dropdown-item>{{$t("common.config")}}</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">{{$t("common.exit")}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside class="aside">
				<!--导航菜单-->
        <el-menu default-active="1-2" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" :collapse="isCollapse">
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
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">{{$t("sys.nv3")}}</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">{{$t("sys.nv4")}}</span>
          </el-menu-item>
        </el-menu>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
import mock from "@/mock/index.js";
import ThemePicker from "@/components/ThemePicker";
export default {
  name: "Home",
  components:{
    ThemePicker
  },
  data() {
    return {
      isCollapse: false,
      sysName: "Alan001",
      username: "Alan001",
      userAvatar: "",
      logo: "",
      activeIndex: '1'
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
    },
    handleSelectHearNavBar(key, keyPath) {
      console.log(key, keyPath)
    },
    // 语言切换
    handleCommand(command) {
      let array = command.split(':')
      let lang = array[0] === '' ? 'zh_cn' : array[0]
      let label = array[1]
      document.getElementById("language").innerHTML = label
      this.$i18n.locale = lang
    },
    //折叠导航栏
    collapse: function() {
      this.isCollapse = !this.isCollapse;
    },
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          sessionStorage.removeItem("user");
          this.$router.push("/login");
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.sysName = "**科技";
    this.logo = require("@/assets/logo.png");
    var user = sessionStorage.getItem("user");
    if (user) {
      this.userName = user;
      this.userAvatar = require("@/assets/user.png");
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: #4b5f6e;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 30px;
      float: right;
      .lang-inner {
        font-size: 15px;
        cursor: pointer;
        color: #fff;
      }
      .userinfo-inner {
        font-size: 20px;
        cursor: pointer;
        padding-left: 15px;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      height: 60px;
      font-size: 22px;
      padding-left: 0px;
      padding-right: 0px;
      border-color: rgba(238, 241, 146, 0.5);
      border-right-width: 1px;
      border-right-style: solid;
      background: #4b5f6e;
      text-align: left;
      img {
          width: 40px;
          height: 40px;
          border-radius: 0px;
          margin: 10px 10px 10px 10px;
          float: left;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 230px;
    }
    .logo-collapse-width {
      width: 65px;
    }
    .tools {
      padding-left: 10px;
      padding-right: 10px;
      text-align: center;
      width: 40px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
    .hearNavBar {
      background: #4b5f6e;
      padding: 0px 0px;
      width: 100%;
      height: 60px;
      line-height: 60px;
      font-size: 29px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;  
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      .el-menu {
        height: 100%;
        text-align: left;
      }
    }
    .content-container {
      // background: #f1f2f7;
      flex: 1;
      // overflow-y: scroll;
      padding: 0px;
      .breadcrumb-container {
        height: 28px;
        background: #fff;
        border-color: rgba(38, 86, 114, 0.2);
        border-bottom-width: 1px;
        border-bottom-style: solid;
        background: rgba(99, 138, 161, 0.2);
        .breadcrumb-inner {
          padding-top: 5px;
          padding-bottom: 5px;
          padding-left: 5px;
          text-align: left;
          font-size: 18px;
          width: 100%;
          height: 100%;
          float: left;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>