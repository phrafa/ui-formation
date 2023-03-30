<template>
    <div>
        <TopBar />
    </div>
    <div class="progress-circular">
        <v-progress-circular indeterminate :size="72"></v-progress-circular>
    </div>
</template>

<script>
import TopBar from './TopBar.vue'

export default {
    name: 'LoadingScreen',
    components: {
        TopBar,
    },
}
</script>

<style>
.progress-circular {
    margin: auto auto;
    background-color: #222;

}
</style>
