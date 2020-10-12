import Vue from 'vue';
import App from './App.vue';
import * as VueGoogleMaps from "vue2-google-maps";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: "places" // for places input
  }
});

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
