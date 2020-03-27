
export default {
	PULL_ACTIVE_EVENTS(state, payload) {
        if(state.activeEvents.length){
            const index = state.activeEvents.findIndex(x => x.host_name === payload.data[0].host_name && x.service_display_name === payload.data[0].service_display_name);
            if(index != -1){
                state.activeEvents.splice(index, 1);
            }
            state.activeEvents.push(...payload.data);
        }else{
            state.activeEvents.push(...payload.data);
        }
        state.activeEvents.sort((a,b) => (a.service_last_state_change > b.service_last_state_change) ? -1 : ((b.service_last_state_change > a.service_last_state_change) ? 1 : 0));
    },
    DEL_NORMAL_EVENTS(state, payload){
        payload.forEach(element => state.activeEvents.splice(element, 1));
    },
    SEARCH_EVENT(state, payload){
        state.eventSearchQuery = payload;
    },
    SORT_ACTIVE_EVENTS(state) {
        state.activeEvents.sort((a,b) => (a.service_last_state_change > b.service_last_state_change) ? -1 : ((b.service_last_state_change > a.service_last_state_change) ? 1 : 0));
    }
}