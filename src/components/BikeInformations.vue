<template>
  <div>
    <div>
      <h3 style="color: #331C54; text-align: center;">Mon velo zoov</h3>
      <div style="margin: 10px; text-align: center;" v-html="content"></div>
    </div>

    <v-divider></v-divider>

    <!-- Update Btn-->
    <div style="margin-top: 10px; margin-bottom: 2px;">
      <v-btn id="update-btn" depressed rounded color="#331C54">
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
</template>

<style>
  #update-btn, #delete-btn {
    height: 25px;
    color: white;
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
    methods: {
      deleteBike() {
        // call api server delete bike
        ApiSrv.deleteBike(this.selectedBike._id).then(() => {
          this.$emit('updateMap');
        }).catch((message) => {
          console.log(message);
        });
      },
    },
  };
</script>
