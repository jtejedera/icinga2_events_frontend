
export default {
    EVENTS: (state) => {
        return state.activeEvents;
    },
    FILTERED_EVENTS: (state) => {
        if(state.eventSearchQuery.length>2){
            let query = state.activeEvents.filter((event) => {
                return event.host_name.toLowerCase().includes(state.eventSearchQuery.toLowerCase()) ||
                event.service_display_name.toLowerCase().includes(state.eventSearchQuery.toLowerCase()) ||
                event.service_output.toLowerCase().includes(state.eventSearchQuery.toLowerCase());
            });
            return query;
        }
        return state.activeEvents;
    }
}