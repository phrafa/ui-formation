<template>
    <div class="center-column">
      sdsd
      <slot name="center"></slot>
    </div>
    <div class="right-column">
      aaa
      <slot name="right"></slot>
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
  width: 50%;
  border: 1px solid #333;
}

.right-column {
  width: 25%;
}
</style>