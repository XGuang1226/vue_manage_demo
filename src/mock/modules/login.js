// 登录接口
const loginData = {
    "code": 200,
    "msg": null,
    "data": {
      "id": null,
      "userId": 1,
      "token": "77ae89be36504adfb5c09ef71409ea0e",
      "expireTime": "2018-09-01T16:24:50.473+0000",
      "createBy": null,
      "createTime": null,
      "lastUpdateBy": null,
      "lastUpdateTime": "2018-09-01T04:24:50.473+0000"
    }
  }
  export function login() {
    return {
      url: 'http://localhost:8080/login',
      type: 'post',
      data: {
        'msg': 'success',
        'code': 0,
        'data': loginData
      }
    }
  }
  // 登出接口
  const logoutData = {
    "code": 200,
    "msg": null,
    "data": {
    }
  }
  export function logout() {
    return {
      url: 'http://localhost:8080/logout',
      type: 'post',
      data: {
        'msg': 'success',
        'code': 0,
        'data': logoutData
      }
    }
  }