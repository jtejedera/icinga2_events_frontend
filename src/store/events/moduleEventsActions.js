import router from '@/router'
import Axios from 'axios';

export default {
  async pullActiveEvents({ commit, state }){
      if(state.activeEvents.length){
        return true;
      }else{
        return new Promise((resolve, reject) => {
          return Axios.get("/activeEvents")
          .then(response => {
              if(response.data.success){
                  commit('PULL_ACTIVE_EVENTS', response.data);
                  resolve(response);  
              }else{
                reject("Error collecting data");
              } 
          })
          .catch(err => {
            reject(err);
          })
        })
      }
  },
  async checkNormalEvents({commit, state}){
    // Checks for NORMAL events in the activeEvents array to delte them.
    // You can change the setInterval in App.vue
    let indexToDelete = [],
        normalFilter = state.activeEvents.filter( event => event.service_state === '0');

    if(normalFilter.length){
      normalFilter.forEach(element => {
        let index = state.activeEvents.findIndex( event => 
          event.host_name === element.host_name && 
          event.service_display_name === element.service_display_name &&
          event.service_output === element.service_output &&
          event.service_last_state_change === element.service_last_state_change &&
          event.service_state === element.service_state
          );
        
        if(index != -1) indexToDelete.push(index);
      });
      
      if(indexToDelete.length) commit('DEL_NORMAL_EVENTS', indexToDelete);
    }

  },
  async sortActiveEvents({commit}){
    commit('SORT_ACTIVE_EVENTS');
  },
  async searchEvent({commit}, payload){
    commit('SEARCH_EVENT', payload);
  },
  SOCKET_pullNewEvent({commit}, payload){
    let newEvent = {
      host_name: payload.host,
      service_display_name: payload.service,
      service_output: payload.check_result.output,
      service_last_state_change: payload.timestamp,
      service_state: `${payload.check_result.state}`
    };
    commit('PULL_ACTIVE_EVENTS', {data: [newEvent]});
  },  
}
