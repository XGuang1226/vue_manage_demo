<template>
  <div class="site-wrapper site-page--not-found">
    <div class="site-content__wrapper">
      <div class="site-content">
        <h2 class="not-found-title">系统介绍</h2>
        <p class="not-found-desc">这是系统介绍页面 ...</p>
        <el-button @click="$router.go(-1)">返回上一页</el-button>
        <el-button type="primary" class="not-found-btn-gohome" @click="$router.push('/')">进入首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "@/http";
  export default {
    components:{
    },
    methods :{
    }
  }
</script>