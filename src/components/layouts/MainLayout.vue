<template>
  <div class="container">
    <side-nav/>
    <div class="content-wrapper">
      <slot/>
    </div>
  </div>
</template>

<script>
import SideNav from '@/components/navigations/SideNav';

export default {
  data:()=>({
    currentFile: null
  }),
  components: {
    SideNav,
  },
  methods: {
    addFile(file){
      this.currentFile = file;
    },
  }
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
