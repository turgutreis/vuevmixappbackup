import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
// const socket = io("https://vmixtestapp.herokuapp.com");
import vueFlvPlayer from "vue-flv-player";
import VueSocketIOExt from "vue-socket.io-extended";
import { io } from "socket.io-client";
const socket = io("http://localhost:3030");
import GAuth from "vue-google-oauth2";
//src/main.js
const gauthOption = {
  clientId:
    "768834812579-007e5802er7gj3c93p8qa9568h8bj3na.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account",
};
Vue.use(GAuth, gauthOption);

Vue.config.productionTip = false;
Vue.use(vueFlvPlayer);
Vue.use(VueSocketIOExt, socket);
new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
