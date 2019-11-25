import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

const store = new vuex.Store({
    state:{
        collapse:false  // 导航栏收缩状态
    },
    mutations:{
        collapse(state){  // 改变收缩状态
            state.collapse = !state.collapse;
        }
    }
})

export default store