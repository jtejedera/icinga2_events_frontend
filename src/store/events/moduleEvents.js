import state from './moduleEventsState.js';
import mutations from './moduleEventsMutations.js';
import actions from './moduleEventsActions.js';
import getters from './moduleEventsGetters.js';

export default {
	namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
};