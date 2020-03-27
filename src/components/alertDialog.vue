<template>
    <v-dialog v-model="isActiveDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="blue-grey darken-3">
          <v-toolbar-title>{{selectedEvent.host_name}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="closeDialog()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list two-line flat disabled>
          <v-subheader>ALERT INFORMATION</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item>
              <v-list-item-icon>
                <v-icon :color="selectedEvent.service_state === '1'?'yellow darken-4':(selectedEvent.service_state==='2'?'red':(selectedEvent.service_state==='3'?'deep-purple darken-1':'green'))" > {{ selectedEvent.service_state === '1'?'report_problem':(selectedEvent.service_state==='2'?'error':(selectedEvent.service_state==='3'?'help':'check_circle'))}} </v-icon>
              </v-list-item-icon>              
              <v-list-item-content>
                <v-list-item-title v-text="'Status'"></v-list-item-title>
                <v-list-item-subtitle v-text="selectedEvent.service_state === '1'?'WARNING':(selectedEvent.service_state==='2'?'CRITICAL':(selectedEvent.service_state==='3'?'UNKNOWN':'OK'))"></v-list-item-subtitle>
                <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>     
            <v-list-item>           
              <v-list-item-content>
                <v-list-item-title v-text="'Hostname'"></v-list-item-title>
                <v-list-item-subtitle v-text="selectedEvent.host_name"></v-list-item-subtitle>
                <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>           
              <v-list-item-content>
                <v-list-item-title v-text="'Affected Service'"></v-list-item-title>
                <v-list-item-subtitle v-text="selectedEvent.service_display_name"></v-list-item-subtitle>
                <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>      
            <v-list-item>           
              <v-list-item-content>
                <v-list-item-title v-text="'Output'"></v-list-item-title>
                <v-list-item-subtitle></v-list-item-subtitle>
                <v-textarea
                  solo
                  name="input-7-2"
                  label="Solo textarea"
                  v-model="selectedEvent.service_output"
                ></v-textarea>                
                <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>           
              <v-list-item-content>
                <v-list-item-title v-text="'Alert date'"></v-list-item-title>
                <v-list-item-subtitle v-text="$moment.unix(selectedEvent.service_last_state_change).format('YYYY-MM-DD HH:mm')"></v-list-item-subtitle>
                <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>                                  
          </v-list-item-group>
        </v-list>   
      </v-card>
    </v-dialog>  
</template>

<script>
import { mapGetters } from 'vuex';

  export default {
    name: 'alertDialog',
    props: {
      isActiveDialog: {
        type: Boolean,
        required: true
      },
      selectedEvent: ''
    },
    data: () => ({
    }),
    computed: {
      isActiveDialogLocal: {
        get() {
          if(this.isActiveDialog) return this.isActiveDialog;
        },
        set(val) {
          if(!val) this.$emit('closeDialog');
        }
      }  
    },
    mounted(){

    },
    methods:{
      closeDialog(){
        this.isActiveDialogLocal = false;
      },      
    }
  }
</script>
