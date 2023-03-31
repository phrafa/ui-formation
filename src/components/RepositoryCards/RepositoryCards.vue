<template>
    <v-container>
        <v-col v-for="(item) in items" :key="item.id">
            <v-card>
                <v-card-title>
                    {{ item.name }}
                </v-card-title>
                <v-card-text>
                    {{ item.description }}
                </v-card-text>
            </v-card>
        </v-col>
    </v-container>
</template>
  
<script>

import { onMounted } from 'vue'


export default {
    setup() {
        onMounted(() => {
            setTimeout(() => {
                window.electron.send("getProjectsControler");
            }, 1000)

            window.electron.receive("getProjectsControler", (data) => {
                console.log({ data })

                if (!data) {
                    return []
                }

                return { items: data }

            })

        })

        return {
            items: [
                { id: 1, name: 'Item 1', description: 'Description of item 1' },
                { id: 2, name: 'Item 2', description: 'Description of item 2' },
                { id: 3, name: 'Item 3', description: 'Description of item 3' },
                { id: 4, name: 'Item 4', description: 'Description of item 4' },
                { id: 5, name: 'Item 1', description: 'Description of item 1' },
                { id: 6, name: 'Item 2', description: 'Description of item 2' },
                { id: 7, name: 'Item 3', description: 'Description of item 3' },
                { id: 8, name: 'Item 4', description: 'Description of item 4' },
            ]
        }
    }
}
</script>
  