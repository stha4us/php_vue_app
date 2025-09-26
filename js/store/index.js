import Vue from 'vue'
import Vuex from 'vuex'

//modules
// import permission from './modules/permission'
import user from './modules/user'
// import app from './modules/app'


import getters from './getters'


Vue.use(Vuex)
// const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules: {
        // permission,
        // app,
        user,

    },
    getters,
//   strict: debug,
//   plugins: debug ? [createLogger()] : []
})

export default store
