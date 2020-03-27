<template>
  <v-app>
    <v-app-bar
      app
      color="blue-grey darken-3"
      dark
    >
      <div class="d-flex align-center">
        <v-icon contain class="shrink mr-2" transition="scale-transition" x-large>sms_failed</v-icon>   
      </div>
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
        v-model="searchWord"
      ></v-text-field>   
    </v-app-bar>

    <v-content fluid>
      <alertList/>
    </v-content>
  </v-app>
</template>

<script>
import alertList from './components/alertList';

export default {
  name: 'App',

  components: {
    alertList,
  },

  data: () => ({
    //
  }),
  computed:{
    searchWord:{
      get(){
        return this.$store.state.events.eventSearchQuery;
      },
      set(val){
        this.$store.commit('events/SEARCH_EVENT', val);
      }

    }
  },
  sockets:{
      error(err){
        console.log(`%c SOCKET ERROR: ${err}`, 'background: red; color: #bada55; font-weight:bold');
      },
      connect(){
          console.log(`%c SOCKET CONNECTED`, 'background: black; color: #bada55; font-weight:bold');
      }       
  },
  methods:{

  },
  mounted(){
    this.$socket.open(); 

    setInterval(() => {
        if(this.$store.getters['events/EVENTS'].length){
          this.$store.dispatch('events/checkNormalEvents');
          this.$store.dispatch('events/sortActiveEvents');
        }
      }, 180000);     
  }
};
</script>
