<!-- TopBar.vue -->
<template>
  <div class="top-bar" v-if="smaillscreen">
    <div class="mac-controls" v-if="isMac">
      <div class="control-icon close" @click="close"></div>
      <div class="control-icon minimize" @click="minimize"></div>
      <div class="control-icon maximize" @click="maximizeRestore"></div>
    </div>
    <div class="app-title">
      <!-- <div><ProfileAvatar  name="John Doe" image="https://picsum.photos/id/237/200/200" /></div> -->
    </div>
  </div>

</template>
  
<script>
// import ProfileAvatar from './ProfileAvatar.vue'

export default {
  components: {
    
  },
  data: () => ({
    isMac: true,
    isMaximized: false,
    smaillscreen: true,


  }),

  methods: {
    close() {
      console.log('close')
      if (window.electron) {
        window.electron.closeApp();
      }
    },
    minimize() {
      if (window.electron) {
        window.electron.minimizeApp();

      }
    },
    maximizeRestore() {
      if (window.electron) {
        window.electron.maximizeRestoreApp();
      }
    },
  },

};
</script>
  
<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: white;
  height: 57px;
  padding: 0 8px;
  -webkit-app-region: drag;
}

.app-title {
  font-weight: bold;
}

.mac-controls {
  display: flex;
  -webkit-app-region: no-drag;
}

.control-icon {
  cursor: pointer;
  margin-right: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.control-icon:hover {
  opacity: 0.8;
}

.close {
  background-color: #ff5f56;
}

.minimize {
  background-color: #ffbd2e;
}

.maximize {
  background-color: #27c93f;
}
</style>

