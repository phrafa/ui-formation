<template>
    <v-container>
        <v-col v-for="(item) in items" :key="item.id">
            <v-card style="background-color: lightslategray;">
                <v-card-title style="font-size: 16px; font-weight: bold;">
                    {{ item.project }}
                </v-card-title>
                <v-card-text style="font-style: italic;">
                    {{ item.squad }}
                </v-card-text>
            </v-card>
        </v-col>
    </v-container>
</template>
  
<script>

import { ref, onMounted } from 'vue'


export default {
    setup() {
        let projects = ref()
        onMounted(async () => {
            setTimeout(() => {
                window.electron.send("getProjectsControler");
            }, 100)

            await window.electron.receive("getProjectsControler", (data) => {
                if (data) {
                    projects.value = data
                }
            })
        })

        console.log({ projects })
        return { items: projects }
    }
}
</script>
  