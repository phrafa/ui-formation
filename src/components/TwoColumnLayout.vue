<template>
      <div class="center-column">
        
        <slot name="center"></slot>
      </div>
  </template>
  
  <script>
  
  export default {
    components: {
      
    },

  };
  </script>
  
<style scoped>

.center-column {
  max-width: 75%;
}

</style>