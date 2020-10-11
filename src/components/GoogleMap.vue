<template>
  <div>
    <!-- Create Bike Section-->
    <sub-navigation @setMapCenter="setMapCenter"
                    @updateMap="updateMap"
                    @sendUserAction="sendUserAction">
    </sub-navigation>

    <!-- User action message -->
    <saving-bar :snackbar="snackbar" :action="userAction"></saving-bar>

    <!-- Map and Bikes -->
    <gmap-map :center="center" :zoom="12" style="height: calc(100vh - 170px);">
      <!-- Bikes Markers -->
      <gmap-marker v-for="(bike, index) in bikes"
                   :key="`bike-${index}`"
                   :position="bike.position"
                   :title="`Batterie: ${bike.battery_level}%`"
                   :icon="require('@/assets/map_bike.png')"
                   @click="toggleBikeInfoWindow(bike, index)">
      </gmap-marker>
      <gmap-info-window :options="bikeInfoWindowOptions"
                        :position="bikeInfoWindowPos"
                        :opened="bikeInfoWindowOpen"
                        @closeclick="closeWindow">        
        <!-- Bikes Informations -->
        <bike-informations v-if="bikeInfoWindowOpen"
                           :selectedBike="selectedBike"
                           :content="bikeInfoWindowContent"
                           @updateMap="updateMap"
                           @updateWindowContent="updateWindowContent"
                           @closeWindow="closeWindow"
                           @sendUserAction="sendUserAction">
        </bike-informations>
      </gmap-info-window>
    </gmap-map>
  </div>
</template>

<script>
  import ApiSrv from '@/js/services/ApiSrv';
  import SavingBar from '@/components/Reusable/SavingBar';
  import SubNavigation from './SubNavigation';
  import BikeInformations from './BikeInformations';

  export default {
    name: "GoogleMap",
    components: {
      SavingBar,
      SubNavigation,
      BikeInformations
    },

    data() {
      return {
        center: { lat: 48.8534, lng: 2.3488 }, // center map on paris
        bikes: [],
        bike: {},
        displayBikeInfos: false,
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
        bikesStatus: { 1: 'libre', 2: 'verrouillé', 3: 'en service' },
        snackbar: { value: false },
        userAction: '',
      };
    },
    computed: {
      selectedBike() { return this.bike; },
    },
    created() {
      this.getAllBikes();
    },
    methods: {
      /**
       * Get all Bikes API data from jsonbox.io
       */
      getAllBikes() {
        ApiSrv.getBikes().then((response) => {
          this.bikes = response;
          this.bikesMarkers();
        }).catch((message) => {
          console.log(message);
        });
      },
      /**
       * Bikes markers coordinates to display
       */
      bikesMarkers() {
        this.bikes.forEach(bike => {
          const coordinates = {};
          coordinates.lng = bike.location.coordinates[0];
          coordinates.lat = bike.location.coordinates[1];
          bike.position = coordinates;
        });
      },
      /**
       * Update Bikes on the map
       */
      updateMap() {
        this.getAllBikes();
      },
      /**
       * Center map to new bike position
       * @param {Object} newBike bike created
       */
      setMapCenter(newBike) {
        this.center = newBike.position;
      },
      /**
       * Close bike window informations
       */
      closeWindow() {
        this.bikeInfoWindowOpen = false;
      },
      /**
       * Open bike window informations
       * @param {Object} bike selected bike
       * @param {Integer} index bike index
       */
      toggleBikeInfoWindow(bike, index) {
        this.bikeInfoWindowPos = bike.position;
        this.bikeInfoWindowContent = this.getBikeInfoWindowContent(bike);
        this.bike = bike;

        if (this.currentBikeIndex == index) {
          this.bikeInfoWindowOpen = ! this.bikeInfoWindowOpen;
        }
        else {
          this.bikeInfoWindowOpen = true;
          this.currentBikeIndex = index;
        }
      },
      /**
       * Update Bike informations in window
       * @param {Object} bike selected bike
       */
      updateWindowContent(bike) {
        this.bikeInfoWindowContent = this.getBikeInfoWindowContent(bike);
      },
      /**
       * Get bike informations
       * @param {Object} bike selected bike
       */
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
      /**
       * Send the user action
       * @param {String} action add, update or delete bike
       */
      sendUserAction(action) {
        this.snackbar.value = true;
        this.userAction = action;
      }
    },
  };
</script>
