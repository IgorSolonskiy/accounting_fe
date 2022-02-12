import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// STYLES
import '@mdi/font/css/materialdesignicons.css'
// ICONS
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faExchangeAlt)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
