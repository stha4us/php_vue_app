import Vue from "vue";
// import VueRouter from 'vue-router';
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router/router.js";
import vueHeadful from "vue-headful";
import store from "./store/index";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { ServerTable, ClientTable, Event } from "vue-tables-2";

Vue.use(ElementUI, {
  locale
});
Vue.component("vue-headful", vueHeadful);
// Vue.use(ClientTable, {}, false, "bootstrap3");

import App from "./components/App";

const app = new Vue({
  el: "#app",
  components: {
    App
  },
  router,
  store
});
