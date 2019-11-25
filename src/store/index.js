import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import app from './modules/Application.js';
import Menu from './modules/Menu.js';

const store = new vuex.Store({
    modules: {
        app: app,
        menu: Menu
    }
})

export default store