import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import store from './store'
Vue.prototype.$store=store;

App.mpType = 'app'

import cuCustom from './libs/colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)


const app = new Vue({
    ...App
})
app.$mount()
