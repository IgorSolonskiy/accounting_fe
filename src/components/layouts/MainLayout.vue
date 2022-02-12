<template>
  <div class="container">
    <side-nav/>
    <div class="content-wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
// COMPONENTS
import SideNav from '@/components/navigations/SideNav';

export default {
  components: {
    SideNav,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100vh;
  width: 100%;

}

.content-wrapper {
  display: flex;
  width: 100%;
  margin: 20px;
}
</style>
