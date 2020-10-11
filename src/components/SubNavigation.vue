<template>
  <div style="margin-left: 5px; margin-bottom: 15px;">
    <div style="display: flex; margin-top: 5px; margin-bottom: 5px;">
      <h3>Rechercher et ajouter un vélo</h3>
      <img src="@/assets/map_bike.png" alt="vélo" style="height: 25px;">
    </div>
    <!-- Places input -->
    <gmap-autocomplete :options="{fields: ['geometry']}"
                        @input="place = $event.target.value"
                        @place_changed="setPlace"
                        style="margin-right: 5px;">
    </gmap-autocomplete>
    <!-- Btn add bike -->
    <v-btn id="add-btn" :disabled="! place" depressed rounded style="height: 25px;"
           @click="addBike()">
      <span>Ajouter un vélo</span>
      <img src="@/assets/map_bike.png" alt="vélo" style="height: 25px;">
    </v-btn>
  </div>
</template>

<style>
  #add-btn {
    background-color: #331C54;
    color: white;
  }
</style>

<script>
  import ApiSrv from '@/js/services/ApiSrv';

  export default {
    name: "SubNavigation",

    data() {
      return {
        place: '',
        selectedPlace: null
      };
    },
    methods: {
      // Receives place via the autocomplete component
      setPlace(place) {
        this.selectedPlace = place;
      },
      // Create new bike and show it on the map
      addBike() {
        if (this.selectedPlace) {
          const longitude = this.selectedPlace.geometry.location.lng();
          const latitude = this.selectedPlace.geometry.location.lat();
          const newBike = {
            serial_number: "",
            location: { type: "Point", coordinates: [longitude, latitude] },
            position: { lng: longitude, lat: latitude },
            in_order: true,
            service_status: 1,
            battery_level: 100
          };

          // Call api server create bike
          ApiSrv.addBike(newBike).then((response) => {
            if (response.ok) {
              this.$emit('updateMap');
              this.$emit('setMapCenter', newBike);
            }
          }).catch((message) => {
            console.log(message);
          });

          this.selectedPlace = null;
        }
      },
    },
  };
</script>
