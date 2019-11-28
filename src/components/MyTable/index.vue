<template>
  <div>
    <!--表格栏-->
    <!-- <el-table :data="data.content" stripe highlight-current-row @selection-change="selectionChange" 
      :v-loading="loading" :max-height="maxHeight" :size="size" :align="align" style="width:100%;" >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column v-for="column in columns" 
        :prop="column.prop" :label="column.label" :width="column.width" :min-width="column.minWidth" 
        :sortable="column.sortable" :fixed="column.fixed" :key="column.prop" :type="column.type">
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" label="编辑" :perms="permsEdit" :size="size" @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>
          <el-button type="danger" label="删除" :perms="permsDelete" :size="size" @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table> -->

    <el-table
        ref="multipleTable"
        :data="data.content"
        stripe
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectionChange">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>

        <el-table-column
        prop="name"
        label="用户名"
        width="120">
        </el-table-column>
        <el-table-column
        prop="deptName"
        label="机构"
        show-overflow-tooltip>
        </el-table-column>
        <el-table-column
        prop="roleNames"
        label="角色"
        show-overflow-tooltip>
        </el-table-column>
        <el-table-column
        prop="status"
        label="状态"
        show-overflow-tooltip>
        </el-table-column>
        <el-table-column
        prop="email"
        label="邮箱"
        show-overflow-tooltip>
        </el-table-column>
        <el-table-column
        prop="mobile"
        label="手机"
        show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
    <!--分页栏-->
    <div class="toolbar" style="padding:10px;">
      <el-button type="danger" label="批量删除" :perms="permsDelete" :size="size" @click="handleBatchDelete()" 
        :disabled="this.selections.length===0" style="float:left;">批量删除</el-button>
      <el-pagination layout="total, prev, pager, next, jumper" @current-change="refreshPageRequest" 
        :current-page="pageRequest.pageNum" :page-size="pageRequest.pageSize" :total="data.totalSize" style="float:right;">
      </el-pagination>
    </div>
    <!-- 编辑模态框 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构" prop="deptName" :label-width="formLabelWidth">
        <el-input v-model="form.deptName" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
        <el-input v-model="form.roleNames" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
        <el-input v-model="form.mobile" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="状态一" value="1"></el-option>
            <el-option label="状态二" value="2"></el-option>
        </el-select>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MyTable',
  props: {
    // columns: Array, // 表格列配置
    // data : Object, // 表格分页数据
    permsEdit: String,  // 编辑权限标识
    permsDelete: String,  // 删除权限标识
    size: { // 尺寸样式
      type: String,
      default: 'mini'
    },
    align: {  // 文本对齐方式
      type: String,
      default: 'left'
    },
    maxHeight: {  // 表格最大高度
      type: Number,
      default: 420
    }
  },
  data() {
    return {
        data:{ //假数据，实际数据应由父组件传进来
            content:[{
                createBy: "admin",
                createTime: "2018-08-14T03:11:11.000+0000",
                delFlag: 0,
                deptId: 4,
                deptName: null,
                email: "admin@qq.com",
                id: 1,
                lastUpdateBy: "admin",
                lastUpdateTime: "2018-08-14T03:11:11.000+0000",
                mobile: "13612345678",
                name: "admin",
                password: "9ec9750e709431dad22365cabc5c625482e574c74adaebba7dd02f1129e4ce1d",
                roleNames: "",
                salt: "YzcmCZNvbXocrsz9dm8e",
                status: 1,
                userRoles:[{
                    createBy: null,
                    createTime: null,
                    id: 1,
                    lastUpdateBy: null,
                    lastUpdateTime: null,
                    roleId: 1,
                    userId: 1
                }]
                }, {
                createBy: "admin",
                createTime: "2018-09-23T11:43:44.000+0000",
                delFlag: 0,
                deptId: 34,
                deptName: "蜀国",
                email: "test@qq.com",
                id: 23,
                lastUpdateBy: "admin",
                lastUpdateTime: "2018-09-23T11:43:52.000+0000",
                mobile: "13889700023",
                name: "赵云",
                password: "7388da1b788173de33cd60023e72b048fe166fd59658eb0829bc92b662fe84b6",
                roleNames: "超级管理员",
                salt: "ba301cfff37c4f4294b1",
                status: 1,
                userRoles:[{
                    createBy: null,
                    createTime: null,
                    id: 50,
                    lastUpdateBy: null,
                    lastUpdateTime: null,
                    roleId: 2,
                    userId: 23
                }]
                }, {
                createBy: "admin",
                createTime: "2018-09-23T11:44:23.000+0000",
                delFlag: 0,
                deptId: 34,
                deptName: "蜀国",
                email: "test@qq.com",
                id: 24,
                lastUpdateBy: "admin",
                lastUpdateTime: "2018-09-23T11:44:29.000+0000",
                mobile: "13889700023",
                name: "诸葛亮",
                password: "03598a9d3ca0175b9652267a475b7b49a589a35bb25c5830e3d02c460f344991",
                roleNames: "测试人员",
                salt: "7f31d587bd1a4ba6b28c",
                status: 1,
                userRoles:[{
                    createBy: null,
                    createTime: null,
                    id: 51,
                    lastUpdateBy: null,
                    lastUpdateTime: null,
                    roleId: 3,
                    userId: 24
                }]
                }, {
                createBy: "admin",
                createTime: "2018-09-23T11:45:48.000+0000",
                delFlag: 0,
                deptId: 33,
                deptName: "魏国",
                email: "test@qq.com",
                id: 26,
                lastUpdateBy: "admin",
                lastUpdateTime: "2018-09-23T11:45:57.000+0000",
                mobile: "13889700023",
                name: "典韦",
                password: "c21cd657efcf9fff6e936155246ec3b3d0dc8051941c2edd80871652950919a7",
                roleNames: "超级管理员",
                salt: "cd0bd6d773314062a743",
                status: 1,
                userRoles:[{
                    createBy: null,
                    createTime: null,
                    id: 53,
                    lastUpdateBy: null,
                    lastUpdateTime: null,
                    roleId: 2,
                    userId: 26
                }]
                }, {
                createBy: "admin",
                createTime: "2018-09-23T11:46:09.000+0000",
                delFlag: 0,
                deptId: 33,
                deptName: "魏国",
                email: "test@qq.com",
                id: 27,
                lastUpdateBy: "admin",
                lastUpdateTime: "2018-09-23T11:46:17.000+0000",
                mobile: "13889700023",
                name: "夏侯惇",
                password: "074f481a029c23fe655bb0a5ca80d4f46239bc7ad6aa1538c00dc32f6185db15",
                roleNames: "超级管理员",
                salt: "68024ab4050f423d9eaf",
                status: 1,
                userRoles:[{
                    createBy: null,
                    createTime: null,
                    id: 54,
                    lastUpdateBy: null,
                    lastUpdateTime: null,
                    roleId: 2,
                    userId: 27
                }]
                }, {
                createBy: "admin",
                createTime: "2018-09-23T11:46:38.000+0000",
                delFlag: 0,
                deptId: 33,
                deptName: "魏国",
                email: "test@qq.com",
                id: 28,
                lastUpdateBy: "admin",
                lastUpdateTime: "2018-11-04T07:33:17.000+0000",
                mobile: "13889700023",
                name: "荀彧",
                password: "74361a718a9a6fa498362d3499c52c7446b1d8eaf2e1babef6bb88257eb7f710",
                roleNames: "超级管理员",
                salt: "fef1f3b8cc674e5a854d",
                status: 1,
                userRoles:[{
                    createBy: null,
                    createTime: null,
                    id: 71,
                    lastUpdateBy: null,
                    lastUpdateTime: null,
                    roleId: 2,
                    userId: 28
                }]
                }, {
                createBy: "admin",
                createTime: "2018-09-23T11:46:54.000+0000",
                delFlag: 0,
                deptId: 35,
                deptName: "吴国",
                email: "test@qq.com",
                id: 29,
                lastUpdateBy: "admin",
                lastUpdateTime: "2018-09-23T11:47:03.000+0000",
                mobile: "13889700023",
                name: "孙权",
                password: "e12430482e68dcbffabbc9591e0b6a22c8609fa297c54311543173f200755bda",
                roleNames: "部门经理",
                salt: "2f4300ded4294bb7bdf9",
                status: 1,
                userRoles:[{
                    createBy: null,
                    createTime: null,
                    id: 56,
                    lastUpdateBy: null,
                    lastUpdateTime: null,
                    roleId: 8,
                    userId: 29
                }]
            }],
            totalSize: 7
        },
        // 分页信息
        pageRequest: {
            pageNum: 1,
            pageSize: 5
        },
        loading: false,  // 加载标识
        selections: [],  // 列表选中列
        dialogFormVisible: false,
        form: {
          name: '',
          deptName: '',
          roleNames: '',
          email: '',
          mobile: '',
          status: ''
        },
        rules: {
            name: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            deptName: [
                { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
            ],
            roleNames: [
                { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
            ],
            email: [
                { required: true, message: '请输入邮箱', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ],
            mobile: [
                { required: true, message: '请输入电话', trigger: 'blur' },
                { type: 'number', message: '请输入正确的电话格式', trigger: ['blur', 'change'] }
            ],
            status: [
                { required: true, message: '请输选择状态', trigger: 'blur' }
            ]
        },
        formLabelWidth: '120px'
    }
  },
  methods: {
    // 分页查询
    findPage: function () {
      this.$emit('findPage', {pageRequest:this.pageRequest})
    },
    // 选择切换
    selectionChange: function (selections) {
            this.selections = selections
    },
    // 换页刷新
    refreshPageRequest: function (pageNum) {
      this.pageRequest.pageNum = pageNum
      this.findPage()
    },
    // 编辑
    handleEdit: function (index, row) {
      this.$emit('handleEdit', {index:index, row:row})
      this.dialogFormVisible = true
      console.log(index, row);
      this.form.name = row.name
      this.form.deptName = row.deptName
      this.form.roleNames = row.roleNames
      this.form.email = row.email
      this.form.mobile = row.mobile
      this.form.status = row.status
    },
    // 删除
    handleDelete: function (index, row) {
        this.delete(row.id)
    },
    // 批量删除
    handleBatchDelete: function () {
        let ids = this.selections.map(item => item.id).toString()
        this.delete(ids)
    },
    // 删除操作
    delete: function (ids) {
        this.$confirm('确认删除选中记录吗？', '提示', {
            type: 'warning'
        }).then(() => {
            let params = []
            let idArray = (ids+'').split(',')
            for(var i=0; i<idArray.length; i++) {
                params.push({'id':idArray[i]})
    }
    let callback = res => {
        this.$message({message: '删除成功', type: 'success'})
        this.findPage()
    }
    this.$emit('handleDelete', {params:params, callback:callback})
        }).catch(() => {
        })
    }
  },
  mounted() {
    this.refreshPageRequest(1)
  }
}
</script>

<style scoped>

</style>