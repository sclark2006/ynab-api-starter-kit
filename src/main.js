import Vue from 'vue';
import App from './App.vue';
import Fragment  from "vue-fragment";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faFlag, faPenSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFlag)
library.add(faEdit)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Fragment.Plugin);

Vue.config.productionTip = false

//Global Registration

new Vue({
  render: h => h(App)
}).$mount("#app");
