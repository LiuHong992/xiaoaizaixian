import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import dayjs from 'dayjs'
import service from "./http"
import lodash from 'lodash'
// import store from '../src/store'
import VCharts from 'v-charts'
// import 'mavon-editor/dist/css/index.css'
// import countTo from 'vue-count-to';
// import 'vue-image-crop-upload'
import JsonExcel from 'vue-json-excel'

Vue.use(ElementUI)
Vue.use(VCharts);
// Vue.use(countTo);
Vue.component('downloadExcel', JsonExcel)
Vue.prototype.$axios = service
Vue.prototype.$dayjs = dayjs
Vue.prototype.$lodash = lodash
    // Vue.prototype.$store = store
Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')