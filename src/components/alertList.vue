<template>
  <v-container fluid>
    <v-list two-line flat width="100%">
      <v-list-item-group> 

        <template v-for="(item, index) in events">
          <v-list-item :key="item.title" @click="openDialog(item)">
            <template>
              <v-list-item-icon>
                <v-icon :color="item.service_state === '1'?'yellow darken-4':(item.service_state==='2'?'red':(item.service_state==='3'?'deep-purple darken-1':'green'))" > {{ item.service_state === '1'?'report_problem':(item.service_state==='2'?'error':(item.service_state==='3'?'help':'check_circle'))}} </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.host_name"> </v-list-item-title>
                <v-list-item-subtitle class="text--primary" v-text="item.service_display_name"></v-list-item-subtitle>
                <v-list-item-subtitle v-text="item.service_output"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text>{{elapsedTime(item.service_last_state_change)}}</v-list-item-action-text>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index + 1 < items.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>    
    <alertDialog :isActiveDialog="dialog" @closeDialog="dialog = false, selectedEvent = {}" :selectedEvent="selectedEvent" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import alertDialog from './alertDialog';

  export default {
    name: 'alertList',

    data: () => ({
      items: [],
      dialog: false,
      selectedEvent: {}
    }),
    computed: {  
      events(){
        return this.$store.getters['events/FILTERED_EVENTS'];
      }      
    },
    mounted(){
      this.$store.dispatch('events/pullActiveEvents')
      .then(() => this.items = this.events)
      .catch(err => console.log("Error ", err) );
        
    },
    methods:{
      openDialog(event){
        this.dialog = true;
        this.selectedEvent = event;
      },
      closeDialog(){
        this.dialog = false
        this.selectedEvent = {}
      },
      elapsedTime(startTime) {
        let formatedTime = this.$moment.unix(startTime).format('YYYY-MM-DD HH:mm');
        let x = new Date(formatedTime);
        let now = new Date();
        var timeDiff = now - x;
        timeDiff /= 1000;

        var seconds = Math.round(timeDiff);
        timeDiff = Math.floor(timeDiff / 60);

        var minutes = Math.round(timeDiff % 60);
        timeDiff = Math.floor(timeDiff / 60);

        var hours = Math.round(timeDiff % 24);
        timeDiff = Math.floor(timeDiff / 24);

        var days = Math.round(timeDiff % 365);
        timeDiff = Math.floor(timeDiff / 365);

        var years = timeDiff;

        if (years > 0) {
            return years + (years > 1 ? ' Years ' : ' Year ') + 'ago';
        } else if (days > 0) {
            return days + (days > 1 ? ' Days ' : ' Day ') + 'ago';
        } else if (hours > 0) {
            return hours + (hours > 1 ? ' Hrs ' : ' Hour ') + 'ago';
        } else if (minutes > 0) {
            return minutes + (minutes > 1 ? ' Mins ' : ' Min ') + 'ago';
        } else if (seconds > 0) {
            return seconds + (seconds > 1 ? `${seconds} sec ago` : 'just now');
        }

        return 'Just Now';
      },      
    },
    components: {
      alertDialog
    },
    watch:{
        dialog(){
            if(!this.dialog) this.selectedEvent = {};
        }
    }    
  }
</script>
