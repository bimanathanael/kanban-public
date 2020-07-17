import Vue from 'vue';
import App from './App.vue';
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '271576244942-ci84ng84o8djrj807glsvv9747kusa4f.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

new Vue({
  render: h => h(App),
}).$mount('#app');