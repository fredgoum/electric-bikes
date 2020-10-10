<template>
  <v-footer id="footer" app color="#331C54">
    <v-col cols="12">
      <span>© Copyright </span>
      {{ new Date().getFullYear() }} - <strong>Zoov</strong>
    </v-col>
  </v-footer>
</template>

<style>
  #footer {
    color:white;
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    text-align: center;
  }
</style>
