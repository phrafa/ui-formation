import { createApp } from 'vue'
import 'core-js/features/array/at';

import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
process.env.PYTHON='/usr/local/bin/python'


loadFonts()

createApp(App)
  .use(vuetify)
  .mount('#app')

