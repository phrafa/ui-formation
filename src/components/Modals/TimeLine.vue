<template>
    <v-timeline align="start">
        <v-timeline-item
        v-for="(item, i) in items"
        :key="i"
        :dot-color="item.color"
        icon="mdi-pencil"
        fill-dot
        >
        <v-card>
            <v-card-title :class="['text-h6', `bg-personal`]">
            {{ item.title }}
            </v-card-title>
            <v-card-text class="bg-white text--primary">
            <p>{{ item.describe }}</p>
                
            </v-card-text>
        </v-card>
        </v-timeline-item>
    </v-timeline>
</template>

<script>
  import { ref, onMounted } from 'vue'

  export default {
    setup() {
        let items = ref([])

        onMounted(() => {
            setTimeout(() => {
            
            }, 100)

            window.electron.receive("sendApplication", (data) => {
                console.log(data)
                let newItem = items.value;

                newItem.push(data)

                items.value = newItem
                
            })
      })

        return {
            items
        }
    },

  }
</script>

<style scoped>

div {
    background-color: #333;
}

.bg-personal {
  background-color: #333 !important;
  color: #FFFFFF !important;
}
.v-timeline {
    background-color: #222;
    color: #FFF;
}
</style>