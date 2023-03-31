<template>
  <div class="columns">
    <div class="left-column">
      <div>
        <RespositoryCards />
        <FloatingActionButton />
      </div>
    </div>
    <TwoColumnLayout />
  </div>
  <div class="content-bar-footer">

  </div>
</template>

<script>
import TwoColumnLayout from "../TwoColumnLayout.vue";
import RespositoryCards from "../RepositoryCards/RepositoryCards.vue"
import FloatingActionButton from "../Buttons/FloatingActionButton.vue";

export default {
  components: {
    TwoColumnLayout,
    RespositoryCards,
    FloatingActionButton
  },
  data() {
    return {
      isTwoColumnLayout: true,
    }
  }

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

.content-bar-footer {

  position: absolute;
  display: flex;
  width: 25%;
}
</style>
