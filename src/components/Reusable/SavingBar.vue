<template>
  <v-snackbar v-model="snackbar.value"
              :color="action == 'add' ? '#006400' : action == 'update' ? '' : '#FF0000'">
    <!-- Action Message -->
    <div>
      <span v-if="action == 'add'">Le vélo a été ajouté avec succès</span>
      <span v-else-if="action == 'update'">Le vélo a bien été mis à jour</span>
      <span v-else>Le vélo est bien supprimé</span>
    </div>
    <!-- Btn close Snakebar -->
    <template v-slot:action="{ attrs }">
      <v-btn v-bind="attrs" text
              @click="snackbar.value = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  export default {
    props: {
      snackbar: { type: Object, default: null },
      action: { type: String, default: null },
    },
  };
</script>
