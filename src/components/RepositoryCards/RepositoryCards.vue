<template>
    <v-container>
        <v-radio-group v-model="selected" @change="submit">
            <v-col v-for="item in items" :key="item.id">

                <v-card style="background-color: #333; color: #fff">
                    <v-card-title style="font-size: 16px; font-weight: bold">
                        {{ item.teamName }}
                    </v-card-title>

                    <v-card-text v-for="project in item.projects" :key="project.id" style="font-style: italic">
                        <v-radio :label=project.name :value=project.hash></v-radio>
                    </v-card-text>
                </v-card>

            </v-col>
        </v-radio-group>

    </v-container>
</template>
  
<script>
import { ref, onMounted } from "vue";

export default {
    setup() {
        let projects = ref();
        onMounted(async () => {
            setTimeout(() => {
                window.electron.send("getProjectsControler");
            }, 100);

            await window.electron.receive("getProjectsControler", (data) => {
                if (data) {
                    projects.value = data;
                }
            });
        });

        return { items: projects };
    },
    data() {
        return {
            selected: ''
        }
    },
    methods: {
        submit() {
            setTimeout(() => {
                window.electron.send("getProjectDetails", this.selected);
            }, 1000)
            // console.log(this.selected); // This will output the selected value of the radio button
        }
    }
};
</script>
  