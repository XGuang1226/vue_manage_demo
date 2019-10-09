//将axios封装成插件，按插件方式引入

import apis from './interface'
const install=Vue=>{
    if(install.installed)
    return;
    install.installed=true;
    Object.defineProperties(Vue.prototype,{
        //注意，此处挂载在Vue原型的$api对象上
        $api:{
            get(){
                return apis
            }
        }
    })
}
export default install