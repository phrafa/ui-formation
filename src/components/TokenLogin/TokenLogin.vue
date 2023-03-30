<template>
    <div>
        <TopBar />
    </div>
    <div class="test">
        <v-sheet id="test" class="pa-16" rounded>
            <v-card class="mx-auto px-6 py-8" max-width="344">
                <v-form v-model="form" @submit.prevent="onSubmit">
                    <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="GitHub Token"
                        placeholder="Enter your github token"></v-text-field>
                    <br>

                    <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit"
                        variant="elevated">
                        Sign In
                    </v-btn>
                </v-form>
            </v-card>
        </v-sheet>
    </div>
</template>

<script>

import TopBar from './TopBar.vue'



export default {
    components: {
        TopBar,
    },
    data: () => ({
        form: false,
        password: null,
        loading: false,
    }),

    methods: {
        onSubmit() {
            if (!this.form) return

            window.electron.send("loginAuth", this.password);
            window.electron.receive("loginAuth", (data) => {
                if (!data.login) {
                    alert(data.message)
                }

            })
        },
        required(v) {
            return !!v || 'Tolken is required'
        },

    },
}
</script>



<style>
.test {
    margin-top: 15%;
}

#test {
    background-color: #222;
}
</style>
