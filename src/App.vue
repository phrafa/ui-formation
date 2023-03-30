<template>
  <div id="app">
    <div class="container">
      <PrincipalLayout />
    </div>
    <!-- <div class="container">
      <TokenLogin />
    </div> -->
  </div>
</template>

<script>

// import TokenLogin from './components/TokenLogin/TokenLogin.vue'
import PrincipalLayout from './components/PrincipalLayout/PrincipalLayout.vue'

export default {
  name: 'App',

  components: {
    // TokenLogin,
    PrincipalLayout
  },

  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    }
  },
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
