import Vue from 'vue';
import Vuex from 'vuex';

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

import moduleEvents from "./events/moduleEvents";

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  getters,
  mutations,
  state,
  actions,  
  modules: {
    events: moduleEvents
  },
  strict: process.env.NODE_ENV !== 'production'
});
