import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueObserveVisibility from "vue-observe-visibility";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueObserveVisibility);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
