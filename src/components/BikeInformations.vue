<template>
  <!-- Status and Battery level -->
  <div v-if="! editBikeStatus">
    <div>
      <h3 id="bike-info-title">Mon vélo zoov</h3>
      <!-- Window content -->
      <div id="window-content">
        <div v-if="contentIsReady" v-html="content"></div>
        <div v-else>
          <v-progress-circular indeterminate></v-progress-circular>
        </div>
      </div>
    </div>
    <v-divider></v-divider>
    <!-- Update Btn-->
    <div id="update-btn-contenair">
      <v-btn id="update-btn" depressed rounded color="#331C54"
             @click="editBikeStatus = true; contentIsReady = false;">
        Mettre à jour
      </v-btn>
    </div>
    <!-- Delete Btn-->
    <div>
      <v-btn id="delete-btn" depressed rounded color="#FF0000"
            @click="deleteBike()">
        Rétirer
      </v-btn>
    </div>
  </div>

  <!-- Edit Bike State -->
  <div v-else style="width: 150px;">
    <div id="status-title"><h3>Status</h3></div>
    <v-divider></v-divider>
    <v-radio-group v-model="bikeStatus" style="margin-left: 10px;" @change="changeBikeStatus()">
      <v-radio
        v-for="status in bikesStatus"
        :key="status.id"
        :label="status.label"
        :value="status"
        color="#331C54"
      ></v-radio>
    </v-radio-group>
  </div>
</template>

<style>
  #bike-info-title {
    color: #331C54;
    text-align: center;
  }
  #window-content {
    margin: 10px;
    text-align: center;
  }
  #update-btn, #delete-btn {
    height: 25px;
    color: white;
  }
  #update-btn-contenair {
    margin-top: 10px;
    margin-bottom: 2px;
  }
  #status-title {
    margin: 5px;
    text-align: center;
  }
</style>

<script>
  import ApiSrv from '@/js/services/ApiSrv';

  export default {
    name: "BikeInformations",
    
    props: {
      selectedBike: { type: Object, default: null },
      content: { type: String, default: null }
    },
    data() {
      return {
        editBikeStatus: false,
        bikesStatus: [ { id: 1, label: 'libre' }, { id: 2, label: 'verrouillé' }, { id: 3, label: 'en service' } ],
        contentIsReady: false,
      };
    },
    computed: {
      bikeStatus: {
        get() {
          const bikeStatus = this.bikesStatus.find(el => el.id == this.selectedBike.service_status);
          return bikeStatus;
        },
        set(newVal) {
          this.selectedBike.service_status = newVal.id;
        }
      }
    },
    created() {
      this.contentIsReady = true;
    },
    methods: {
      /**
       * Call api server delete bike
       */
      deleteBike() {
        ApiSrv.deleteBike(this.selectedBike._id).then((response) => {
          if (response.ok) {
            this.$emit('updateMap');
            this.$emit('closeWindow');
            this.$emit('sendUserAction', 'delete');
          }
        }).catch((message) => {
          console.log(message);
        });
      },
      /**
       * Call api to change bike status to free, booked or in use
       */
      changeBikeStatus() {
        ApiSrv.updateBike(this.selectedBike).then((response) => {
          if (response.ok) {
            this.$emit('updateWindowContent', this.selectedBike);
            this.$emit('sendUserAction', 'update');
            this.contentIsReady = true;
          }
        }).catch((message) => {
          console.log(message);
        });

        this.editBikeStatus = false;
      },
    },
  };
</script>
