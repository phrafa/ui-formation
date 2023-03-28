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

export default {
  name: 'App',

  components: {
    TopBar,
    ContentsLayout,

  },

  data() {
    return {
      isTwoColumnLayout: true,
    };
  },
  methods: {
    toggleLayout() {
      console.log('efeefef')
      this.isTwoColumnLayout = !this.isTwoColumnLayout;
    },
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

.topbar {
  /* Estilize sua topbar aqui */
}
</style>
