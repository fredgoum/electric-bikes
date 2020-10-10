import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCJGxU5qVcWeC-qliA4_NEOUoHh0lYALhM",
  }
});

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
