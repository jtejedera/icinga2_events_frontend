import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;

// axios
import axios from 'axios';
Vue.prototype.$axios = axios;

const baseURL = 'http://192.168.1.39:8000/api';
if (typeof baseURL !== 'undefined') {
  axios.defaults.baseURL = baseURL;
};

//socket.io
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

Vue.use(new VueSocketIO({
    debug: false,
    connection: SocketIO('http://192.168.1.39:8000',{autoConnect: false}),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

//moment.js
import VueMoment from "vue-moment";
import momentTimezone from "moment-timezone";

momentTimezone.tz.setDefault("Europe/Madrid");
Vue.use(VueMoment);

//Vuetify
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
  },
});


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
