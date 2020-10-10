<template>
  <div id="app">
    <!-- Naviagtion -->
    <h1>Zoov</h1>
    <!-- Map -->
    <google-map/>
    <!-- About -->
    <div>footer</div>
  </div>
</template>

<script>
import GoogleMap from "./components/GoogleMap";

export default {
  name: "App",

  components: {
    GoogleMap
  }
};
</script>
