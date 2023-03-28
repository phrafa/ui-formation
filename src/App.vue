<template>
  <div id="app">
    <div class="container">
      <div class="topbar">
        <TopBar />
      </div>
      <ContentsLayout />
    </div>
  </div>
</template>

<script>

import TopBar from './components/TopBar.vue'
import ContentsLayout from '@/components/ContentsLayout.vue'
// import FullScreen from '@/components/Modals/FullScreen.vue'

export default {
  name: 'App',

  components: {
    TopBar,
    ContentsLayout,
    // FullScreen
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

.topbar {}
</style>
