/* 
 * 机构管理模块
 */

// 保存
export function save() {
    return {
      url: 'dept/save',
      type: 'post',
      data: {
        "code": 200,
        "msg": null,
        "data": 1
      }
    }
  }
  // 批量删除
  export function batchDelete() {
    return {
      url: 'dept/delete',
      type: 'post',
      data: {
        "code": 200,
        "msg": null,
        "data": 1
      }
    }
  }
  // 查询机构树
  let findTreeData = {
    "code": 200,
    "msg": null,
    "data": {}
  }
  let content = []
  for(let i=0; i<3; i++) {
    let obj = {}
    obj.deptId   = i + 1
    obj.parentId   = 0
    obj.name = 'dept  ' + obj.deptId
    obj.children = []
    content.push(obj)
  }
  for(let i=0; i<content.length; i++) {
    let parent = content[i]
    for(let i=0; i<5; i++) {
      let obj = {}
      obj.deptId   = i + 1 + (i * parent.deptId)
      obj.parentId   = parent.deptId
      obj.name = 'dept  ' + obj.deptId
      parent.children.push(obj)
    }
  }
  findTreeData.data.content = content
  export function findDeptTree(params) {
    return {
      url: 'dept/findTree',
      type: 'get',
      data: findTreeData
    }
  }