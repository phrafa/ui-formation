<template>
  <div class="center-column">
        <FullScreen />
        
      </div>

</template>
  
<script>
import FullScreen from '@/components/Modals/FullScreen.vue'

export default {
  components: {
    FullScreen
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