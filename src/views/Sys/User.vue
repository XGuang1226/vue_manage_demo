<template>
    <div>
        <el-row :gutter="20">
        <el-col :span="8">
            <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">
                <el-button slot="prepend">用户名</el-button>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-col>
        <el-col :span="8"><div class="grid-content bg-purple"><el-button type="primary">主要按钮</el-button>
        <el-button type="danger">危险按钮</el-button></div></el-col>
        </el-row>
        <my-table></my-table>
    </div>
</template>

<script>
  import MyTable from '@/components/MyTable'
  export default {
    name:'User',
    components:{
        MyTable
    },
    data() {
      return {
        input1:''
      }
    },

    methods: {
      
    }
  }
</script>

<style scoped lang="scss">
.el-row {
    margin: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
</style>