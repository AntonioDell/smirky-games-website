import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import VueObserveVisibility from "vue-observe-visibility";
import VueLogger from 'vuejs-logger';

Vue.config.productionTip = false;

Vue.use(VueObserveVisibility);
const loggerOptions = {
  isEnabled: true,
  logLevel : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : true,
  separator: '|',
  showConsoleColors: true
};
Vue.use(VueLogger, loggerOptions);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
