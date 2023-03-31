<template>
  <div class="containerWelcome">
    <div class="content">
      <h1>UI Formation</h1>
      <p>UI for building your infrastructure</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'WelcomePage',  
  components: {
    
  },
  dialog: false,
  notifications: false,
  sound: true,
  widgets: false,
  
};
</script>

<style>
.containerWelcome {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  width: 130vh;
  margin: auto auto;
}

.containerWelcome .content {
  text-align: center; /* Para alinhar o conteúdo centralizado na horizontal */
  
}
</style>