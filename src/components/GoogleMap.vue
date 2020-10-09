<template>
  <div>
    <div>
      <h1>Zoov</h1>
    </div>
    <br>
    <gmap-map :center="center" :zoom="12" style="width:100%; height: 500px;">
      <gmap-marker v-for="(marker, index) in markers" :key="'marker' + index" :position="marker.coordinates">
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",

  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      markers: [{ coordinates: { lat: 45.508, lng: -73.587 } }, { coordinates: { lat: 45.500, lng: -73.5 } }],
    };
  },
};
</script>
