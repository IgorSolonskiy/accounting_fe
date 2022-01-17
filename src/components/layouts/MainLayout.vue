<template>
  <div class="container">
    <side-nav/>
    <div class="content-wrapper">
      <div class="import-wrapper">
        <h2>Import excel file</h2>
        <import-excel-form/>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "@/components/navigations/SideNav";
import ImportExcelForm from "@/components/forms/ImportExcelForm";

export default {
  components: {
    SideNav,
    ImportExcelForm
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
