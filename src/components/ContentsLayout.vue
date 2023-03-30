<template>
  <div class="columns">
    <div class="left-column">
      <FloatingActionButton @click="onButtonClick" />
    </div>
    <TwoColumnLayout />  
  </div>
</template>

<script>
import FloatingActionButton from "@/components/Buttons/FloatingActionButton.vue";
import TwoColumnLayout from "@/components/TwoColumnLayout.vue";

export default {
  components: {
    FloatingActionButton,
    TwoColumnLayout,
  },
  data() {
    return {
      isTwoColumnLayout: true,

    };
  },
  methods: {
    onButtonClick() {
      window.electron.send("testeOnce", "oi sp");
      window.electron.receive("testeOnce", (data) => {
            console.log(`Received ${data} from main process`);
      });
      

    },
  },
};
</script>
  
<style scoped>
.columns {
  display: flex;
  flex: 1;
}

.left-column {
  flex: 1;
  max-width: 25%;
  border: 1px solid #333;
}

</style>