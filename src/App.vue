<template>
  <v-app class="overflow-hidden">
    <v-main>
      <component :is="layout">
        <router-view/>
      </component>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
// COMPONENTS
import MainLayout from "@/components/layouts/MainLayout.vue";

export default Vue.extend({
  name: 'App',
  computed:{
    layout(){
      return this.$route.meta.layout || "main-layout"
    }
  },
  components:{
    MainLayout
  }
});
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  overflow-y: auto !important
}
</style>