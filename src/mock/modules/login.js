//登录相关的接口模拟

export function login(){
    return{
        //isOpen:false,
        url:'http://localhost:8080/login',
        type:'post',
        data:{
            'msg':'success',
            'code':0,
            'data':{
                'token':'324234234235435233212'
                //其他数据
            }
        }
    }
}