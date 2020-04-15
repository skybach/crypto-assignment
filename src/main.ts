import Vue from "vue";
import App from "./App.vue";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import VueClipboard from 'vue-clipboard2'; 
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

Vue.config.productionTip = false;

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

new Vue({
  render: h => h(App)
}).$mount("#app");
