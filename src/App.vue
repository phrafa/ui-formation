<template>
  <div id="app">
    <div class="container">
    <div class="topbar">
      <TopBar />
    </div>
    <div class="columns">
      <div class="left-column">
        sdsds
        <slot name="left"></slot>
      </div>
      <div class="center-column">
        sdsd
        <slot name="center"></slot>
      </div>
      <div class="right-column">
        dsd
        <slot name="right"></slot>
      </div>
    </div>
  </div>
    
    <!-- Restante do seu aplicativo -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TopBar from './components/TopBar.vue'


export default {
  name: 'App',

  components: {
    //HelloWorld,
    TopBar
  },

  data: () => ({
    //
  }),
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

.columns {
  display: flex;
  flex: 1;
}

.left-column,
.center-column,
.right-column {
  flex: 1;
  padding: 1rem;
}

/* Ajuste o tamanho das colunas aqui, se necessário */
.left-column {
  max-width: 25%;
}

.center-column {
  max-width: 50%;
}

.right-column {
  max-width: 25%;
}
</style>
