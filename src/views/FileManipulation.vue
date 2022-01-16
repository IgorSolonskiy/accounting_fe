<template>
  <main-layout/>
</template>

<script lang="ts">
import Vue from 'vue'
import MainLayout from '../components/layouts/MainLayout.vue'

export default Vue.extend({
  name: 'FileManipulation',

  components: {
    MainLayout,
  },
})
</script>