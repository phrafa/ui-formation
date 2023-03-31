<template>
  <div class="columns">
    <div class="left-column">
      <FloatingActionButton />
    </div>
    <TwoColumnLayout />
  </div>
</template>

<script>
import FloatingActionButton from "../Buttons/FloatingActionButton.vue";
import TwoColumnLayout from "../TwoColumnLayout.vue";

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
