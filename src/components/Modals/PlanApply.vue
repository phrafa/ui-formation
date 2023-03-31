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
                @click="dialog = false"
              >
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-list
            lines="two"
            subheader
          >
            <v-list-subheader>User Controls</v-list-subheader>
            <v-list-item title="Content filtering" subtitle="Set the content filtering level to restrict apps that can be downloaded"></v-list-item>
            <v-list-item title="Password" subtitle="Require password for purchase or use password to restrict purchase"></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list
            lines="two"
            subheader
          >
            <v-list-subheader>General</v-list-subheader>
            <v-list-item title="Notifications" subtitle="Notify me about updates to apps or games that I downloaded">
              <template v-slot:prepend>
                <v-checkbox v-model="notifications"></v-checkbox>
              </template>
            </v-list-item>
            <v-list-item title="Sound" subtitle="Auto-update apps at any time. Data charges may apply">
              <template v-slot:prepend>
                <v-checkbox v-model="sound"></v-checkbox>
              </template>
            </v-list-item>
            <v-list-item title="Auto-add widgets" subtitle="Automatically add home screen widgets">
              <template v-slot:prepend>
                <v-checkbox v-model="widgets"></v-checkbox>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
    </v-row>
  </template>

<script>
export default {
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
}
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
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