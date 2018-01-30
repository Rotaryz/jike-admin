import Vue from 'vue'
import App from './App'
import router from './router'
import {initAxios} from 'common/js/config'
import 'element-ui/lib/theme-chalk/index.css'
import {DatePicker} from 'element-ui'

import 'common/stylus/index.styl'

Vue.use(DatePicker)

initAxios()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
