<template>
  <div class="container">
      <!-- 导航菜单栏 -->
      <menu-bar></menu-bar>
      <!-- 头部区域 -->
      <head-bar></head-bar>
      <!-- 主内容区域 -->
      <Main></Main>
  </div>
</template>

<script>
import HeadBar from "./HeadBar/HeadBar"
import MenuBar from "./MenuBar/MenuBar"
import Main from "./Main/Main"
export default {
  components:{
        HeadBar,
        MenuBar,
        Main
  }
};
</script>

<style scoped lang="scss">
  .container {
    position:absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    // background: rgba(224, 234, 235, 0.1);
  }
</style>