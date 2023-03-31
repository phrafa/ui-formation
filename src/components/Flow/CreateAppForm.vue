<template>
  <div class="center-column">
    <div class="create-app-form">
      <v-form @submit.prevent="onSubmit">
        <v-radio-group inline v-model="form.bodyplate">
          <v-container class="create-app-form">
            <v-row>

              <v-col md="6">
                <v-card class="mx-auto" icon="fa:fas fa-tachometer-alt">
                  <template v-slot:title>
                    NodeJS
                  </template>

                  <v-card-text>
                    <v-radio label="NodeJs <3" value="node"></v-radio>
                  </v-card-text>
                </v-card>

              </v-col>

              <v-col md="6">
                <v-card class="mx-auto">
                  <template v-slot:title>
                    GoLang
                  </template>

                  <v-card-text>
                    <v-radio label="Go Lang Fast and Furious" value="go"></v-radio>
                  </v-card-text>
                </v-card>

              </v-col>
            </v-row>
          </v-container>

        </v-radio-group>

        <v-container class="create-app-form">
          <v-row>
            <v-col md="6">
              <v-text-field v-model="form.projectName" label="Project Name" prepend-icon="mdi-pencil" variant="outlined">
              </v-text-field>

            </v-col>

            <v-col md="6">
              <v-select label="Tribe & Squad" v-model="form.tribe" prepend-icon="mdi-pencil" :items=namespaces
                variant="underlined"></v-select>
            </v-col>
          </v-row>
        </v-container>

        <v-col md="6">
          <v-textarea v-model="form.s3" prepend-icon="mdi-folder" label="Buckets S3 (delimiter ' , ')"
            variant="outlined"></v-textarea>
        </v-col>

        <v-col md="6">
          <v-textarea v-model="form.sqs" prepend-icon="mdi-pencil" label="SQS (delimiter ' , ')"
            variant="outlined"></v-textarea>
        </v-col>

        <v-col md="6">
          <v-textarea v-model="form.envVar" prepend-icon="mdi-pencil" label="ENV (KEY=VAL)"
            variant="outlined"></v-textarea>
        </v-col>


      </v-form>
      <PlanApply :formData="form" />
    </div>
  </div>
</template>
    
<script>
import PlanApply from '@/components/Modals/PlanApply.vue'
import { ref } from 'vue'

export default {
  components: {
    PlanApply
  },
  setup() {
    let namespaces = ref([])
    let form = ref({
      bodyplate: '',
      projectName: '',
      tribe: '',
      ingress: '',
      rds: '',
      sqs: '',
      s3: '',
      envVar: ''
    })

    window.electron.receive("getProjectDetails", (data) => {

      console.log('-----')
      console.log(JSON.stringify(data))
      if (data) {
        form.value = {
          bodyplate: 'node',
          projectName: data['fleet-web-service'].appname,
          tribe: data.global.tribe,
          ingress: '',
          rds: '',
          sqs: '',
          s3: ''
        }
      }
    })

    return {
      namespaces,
      form
    }
  },
  data() {
    return {

    }
  },
  methods: {
    onSubmit() {
      console.log('Formulário enviado com sucesso')
    },
    sendData() {
      console.log('form-data', this.form);
    }
  },
  dialog: false,
  notifications: false,
  sound: true,
  widgets: false,

};
</script>
    
<style scoped>
.create-app-form {
  padding: 15px;
  color: #FFF
}

.create-app-form {
  padding: 15px;
}

.v-card {
  background-color: #333;
  color: #FFF;
  width: 100%;
}

.center-column {
  max-width: 75%;
}

.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>
