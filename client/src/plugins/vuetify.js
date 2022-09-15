import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import { library } from "@fortawesome/fontawesome-svg-core";

import { fas } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("font-awesome-icon", FontAwesomeIcon);
library.add(fas);
Vue.use(Vuetify);

export default new Vuetify({});
