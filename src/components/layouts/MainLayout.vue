<template>
  <div class="container">
    <side-nav/>
    <div class="content-wrapper">
      <div class="import-wrapper">
        <h2>Import file</h2>
        <file-input/>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "@/components/navigations/SideNav";
import FileInput from "@/components/inputs/FileInput";

export default {
  components: {
    SideNav,
    FileInput
  }
}
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
}

.import-wrapper {
  width: 50%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
