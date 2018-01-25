import Vue from 'vue'
import App from './App'
import router from './router'
import {initAxios} from 'common/js/config'

import 'common/stylus/index.styl'

initAxios()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
