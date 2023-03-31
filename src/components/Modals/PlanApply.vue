<template>
    
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ props }">
          <div class="div-finish">
            <v-btn
            v-bind="props"
              class="btn-finish"
              color="#444"
              
              >
              <v-icon  icon="mdi-cloud-upload"></v-icon> 
              <span>Plan & Apply</span> 
            </v-btn>
          </div>
        </template>
        <v-card>
          <v-toolbar
            dark
            color="#333"
          >
            <v-btn
              icon
              dark
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Plan & Apply</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                variant="text"
                @click="createApplication"
              >
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <div style="height: 100%; color: #FFF; width: 100%; background-color: #222;">
            <v-container >
              <v-row>
                  <v-col md="4"> 
                    <v-card>
                      <v-card-title style="font-size: 16px; font-weight: bold">
                          Project Name
                      </v-card-title>

                      <v-card-text style="font-style: italic">
                        {{ formData.projectName }}
                      </v-card-text>
                    </v-card>
                   
                    <v-card style="background-color: #333; color: #fff">
                      <v-card-title style="font-size: 16px; font-weight: bold">
                          Tribe and Squad
                      </v-card-title>

                      <v-card-text style="font-style: italic">
                        {{ formData.tribe }}
                      </v-card-text>
                    </v-card>

                    <v-card style="background-color: #333; color: #fff">
                      <v-card-title style="font-size: 16px; font-weight: bold">
                          Bodyplate
                      </v-card-title>

                      <v-card-text style="font-style: italic">
                        {{ formData.bodyplate }}
                      </v-card-text>
                    </v-card>
                    
                    <v-card style="background-color: #333; color: #fff">
                      <v-card-title style="font-size: 16px; font-weight: bold">
                          Ingress
                      </v-card-title>

                      <v-card-text style="font-style: italic">
                        {{ formData.ingress }}
                      </v-card-text>
                    </v-card>

                    <v-card style="background-color: #333; color: #fff">
                      <v-card-title style="font-size: 16px; font-weight: bold">
                          Relational Database
                      </v-card-title>

                      <v-card-text style="font-style: italic">
                        {{ formData.rds }}
                      </v-card-text>
                    </v-card>

                    <v-card style="background-color: #333; color: #fff">
                      <v-card-title style="font-size: 16px; font-weight: bold">
                          Buckets S3
                      </v-card-title>

                      <v-card-text style="font-style: italic">
                        {{ formData.s3 }}
                      </v-card-text>
                    </v-card>

                    <v-card style="background-color: #333; color: #fff">
                      <v-card-title style="font-size: 16px; font-weight: bold">
                          SQS
                      </v-card-title>

                      <v-card-text style="font-style: italic">
                        {{ formData.sqs }}
                      </v-card-text>
                    </v-card>

                    <v-card style="background-color: #333; color: #fff">
                      <v-card-title style="font-size: 16px; font-weight: bold">
                        Environment variables
                      </v-card-title>

                      <v-card-text style="font-style: italic">
                        {{ formData.envVar }}
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col md="8">  
                    <TimeLine />
                  </v-col>
              </v-row>
            </v-container>      
            
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </template>

<script>
import TimeLine from '@/components/Modals/TimeLine.vue'

export default {
  components: {
    TimeLine
  },
  props: {
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    }
  },
  methods: {
    createApplication() {
      console.log(this.formData)
      //window.electron.send('sendApplication', this.formData)
      window.electron.send("sendApplication", true);
    }
  }
}
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}

.v-card {
  background-color: #333; color: #fff;
  margin: 5px;
}

.v-container {
  width: 100%;
  max-width: 100%;
  padding: 30px;
}

.v-toolbar__content {
  color: #FFF
}

.div-finish {
  position: fixed;
  bottom: 20px;
  right: 10px;
  min-width: 50px;
  /* background-color: #FFF; */
  
}

.btn-finish {
  display: flex;
  padding: 5px;
}

.btn-finish span {
  display: flex;
  padding: 5px;
}
</style>