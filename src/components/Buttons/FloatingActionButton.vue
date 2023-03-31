<template>
    <div class="floating-action-button">
      <button @click="toggleLayout" class="icon"><i class="material-icons icon-text">add_circle_outline</i> <span class="icon-text">Add Application</span></button>
    </div>
  </template>
  
  <script>
  export default {
    name: "FloatingActionButton",
    methods: {
      toggleLayout() {
        console.log('sdsdwdsdskdjsdk')
        window.electron.send("createNewApp", true);
    },
    },
  };
  </script>
  
  <style scoped>
  .floating-action-button {
    background-color: #222;
    position: fixed;
    border-top: 1px solid #333;
    border-right: 1px solid #333;
    bottom: 0px;
    color: #ffffff;
    width: 25%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .icon {
    
    display: flex;
    align-items: center;
  }

  .icon-text {
    margin-right: 0.5rem;
  }
  </style>