<template>
  <div id="app">
    <!-- Naviagtion -->
    <navigation></navigation>
    <!-- Map -->
    <google-map></google-map>
    <!-- About -->
    <about></about>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import GoogleMap from "@/components/GoogleMap";
import About from "@/components/About";

export default {
  name: "App",

  components: {
    Navigation,
    GoogleMap,
    About
  }
};
</script>
