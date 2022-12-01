import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import routes from './routes'
import store from './store'

require('../public/dist/output.css');

Vue.use(Router)


const router = new Router({
  mode: 'history',
  routes: routes
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
