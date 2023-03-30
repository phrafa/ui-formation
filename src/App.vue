
<template>
  <div id="app">
    <div class="container">
      <component v-bind:is="component" />
    </div>
  </div>
</template>

<script>

import TokenLogin from './components/TokenLogin/TokenLogin.vue'
import PrincipalLayout from './components/PrincipalLayout/PrincipalLayout.vue'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import { ref, onMounted } from 'vue'

export default {
  name: 'App',

  components: {
    TokenLogin,
    PrincipalLayout,
    LoadingScreen
  },
  setup() {
    let layout = ref('LoadingScreen')

    onMounted(() => {
      setTimeout(() => {
        window.electron.send("loginAuth", null);



      }, 1000)

      window.electron.receive("loginAuth", (data) => {
        if (data.login) {
          layout.value = 'PrincipalLayout'
        } else {
          layout.value = 'TokenLogin'
        }


      })
    })

    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      component: layout,
    }

  }
}
</script>

<style scoped>
#app {
  background-color: #222;
  color: #FFF
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
