<template @createNewApp="teste">
  <div style="width: 75%;">
    <component v-bind:is="component" />
  </div>
</template>
  
<script>
import WelcomePage from '@/components/Flow/WelcomePage.vue'
import CreateAppForm from './Flow/CreateAppForm.vue';
import { ref, onMounted } from 'vue'

export default {
  components: {
    WelcomePage,
    CreateAppForm
  },
  setup() {
    let componentActive = ref('WelcomePage')

    onMounted(() => {
      setTimeout(() => {
        console.log('aguarde...')
      }, 100)

      window.electron.receive("createNewApp", (data) => {
        if (data) {
          componentActive.value = 'CreateAppForm'
          window.electron.send("listNamespaces", true);
        }

      })


    })

    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      component: componentActive,
    }

  },
  methods: {
    teste() {
      console.log('aaaa')
    }
  },
  dialog: false,
  notifications: false,
  sound: true,
  widgets: false,

};
</script>
  