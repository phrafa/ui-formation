<template>
    <div class="center-column">
      <div>
        <div>content</div>
        <PlanApply />
      </div>
    </div>
  </template>
    
  <script>
  import PlanApply from '@/components/Modals/PlanApply.vue'
  
  export default {
    components: {
      PlanApply
    },
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    
  };
  </script>
    
  <style scoped>
  
  .center-column {
    max-width: 75%;
  }
  
  .dialog-bottom-transition-enter-active,
  .dialog-bottom-transition-leave-active {
    transition: transform 0.2s ease-in-out;
  }
  </style>