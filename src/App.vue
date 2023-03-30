
<template>
  <div id="app">
  <!-- <div class="container">
      <PrincipalLayout />
                  </div> -->
  <!-- <div class="container">
      <TokenLogin />
                  </div> -->
    <div class="container">
      <component v-bind:is="component" />
    </div>
  </div>
</template>

<script>

import TokenLogin from './components/TokenLogin/TokenLogin.vue'
import PrincipalLayout from './components/PrincipalLayout/PrincipalLayout.vue'
import { ref, onMounted } from 'vue'

export default {
  name: 'App',

  components: {
    TokenLogin,
    PrincipalLayout
  },
  setup() {
    let isLogged = false //function
    let layout = ref('TokenLogin')

    if (isLogged)
      layout = ref('PrincipalLayout')

    onMounted(() => {
      window.electron.receive("loginAuth", (data) => {
        if (data) {
          console.log(`Received from auth login`)
          layout.value = 'PrincipalLayout'

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
