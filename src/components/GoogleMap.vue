<template>
  <div>
    <!-- Create bike -->
    <sub-navigation @showBikeOnMap="showBikeOnMap"></sub-navigation>

    <!-- Map and Bikes -->
    <gmap-map :center="center" :zoom="12" style="height: calc(100vh - 170px);">
      <!-- Bikes -->
      <gmap-marker v-for="(bike, index) in bikes"
                   :key="`bike-${index}`"
                   :position="bike.position"
                   :title="`Batterie: ${bike.battery_level}%`"
                   :icon="require('@/assets/map_bike.png')"
                   @click="toggleBikeInfoWindow(bike, index)">
      </gmap-marker>
      <!-- Bikes Infos -->
      <gmap-info-window :options="bikeInfoWindowOptions"
                        :position="bikeInfoWindowPos"
                        :opened="bikeInfoWindowOpen"
                        @closeclick="bikeInfoWindowOpen=false">
        <h4 style="color: #331C54;">
          Mon velo zoov
        </h4>
        <div style="margin-top: 5px;" v-html="bikeInfoWindowContent"></div>
      </gmap-info-window>
    </gmap-map>
  </div>
</template>

<script>
import ApiSrv from '@/js/services/ApiSrv';
import SubNavigation from './SubNavigation';

export default {
  name: "GoogleMap",
  components: {
    SubNavigation
  },

  data() {
    return {
      center: { lat: 48.8534, lng: 2.3488 }, // center map on paris
      bikes: [],
      markers: [],
      bikeInfoWindowPos: {
        lat: 0,
        lng: 0
      },
      bikeInfoWindowContent: '',
      bikeInfoWindowOpen: false,
      bikeInfoWindowOptions: {
        pixelOffset: {
          width: 0,
          height: -40
        }
      },
      currentBikeIndex: null,
      bikesStatus: { 1: 'libre', 2: 'verrouillé', 3: 'en service' }
    };
  },
  created() {
    // Get Bikes API data from jsonbox.io
    ApiSrv.getBikes().then((response) => {
      this.bikes = response;
      this.bikesMarkers();
    }).catch((message) => {
      console.log(message);
    });
  },
  methods: {
    // Bikes markers coordinates to display
    bikesMarkers() {
      this.bikes.forEach(bike => {
        const coordinates = {};
        coordinates.lng = bike.location.coordinates[0];
        coordinates.lat = bike.location.coordinates[1];
        bike.position = coordinates;
      });
    },
    // Open bike information window
    toggleBikeInfoWindow(bike, index) {
      this.bikeInfoWindowPos = bike.position;
      this.bikeInfoWindowContent = this.getBikeInfoWindowContent(bike);

      if (this.currentBikeIndex == index) {
        this.bikeInfoWindowOpen = ! this.bikeInfoWindowOpen;
      }
      else {
        this.bikeInfoWindowOpen = true;
        this.currentBikeIndex = index;
      }
    },
    // Get informations on the bike
    getBikeInfoWindowContent(bike) {
      return(
        `<div>
          <strong>Status</strong>: ${this.bikesStatus[bike.service_status]}
        </div>
        <div>
          <strong>Batterie</strong>: ${bike.battery_level}%
        </div>`
      );
    },
    // Display the new bike
    showBikeOnMap(newBike) {
      this.bikes.push(newBike);
      this.center = newBike.position;
    },
  },
};
</script>
