import Vue from 'vue';
import App from './App.vue';
import Fragment  from "vue-fragment";

Vue.use(Fragment.Plugin);
//Global Registration
//import Layout from './pages/Layout.vue';
//Vue.component('layout', Layout);
// Create our Vue App and replace the <div id="app"></div> with it
new Vue({
  render: h => h(App)
}).$mount("#app");
