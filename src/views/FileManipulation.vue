<template>
  <side-nav />
</template>

<script lang="ts">
import Vue from 'vue'
import SideNav from '../components/navigations/SideNav.vue'

export default Vue.extend({
  name: 'FileManipulation',

  components: {
    SideNav,
  },
})
</script>