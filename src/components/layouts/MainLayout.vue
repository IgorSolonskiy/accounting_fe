<template>
  <div class="container">
    <side-nav/>
    <div class="content-wrapper">
      <import-excel-form @addFile="addFile"/>

      <div class="exchange-wrapper">
        <font-awesome-icon icon="exchange-alt"/>
      </div>
      <export-excel-file v-if="currentFile"/>
      <div v-else class="no-item-wrapper">
        <v-card
            elevation="2"
        >
          <v-card-text>
            Please upload the file.
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from '@/components/navigations/SideNav';
import ImportExcelForm from '@/components/forms/ImportExcelForm';
import ExportExcelFile from '@/components/forms/ExportExcelFile';

export default {
  data:()=>({
    currentFile: 1
  }),
  components: {
    SideNav,
    ImportExcelForm,
    ExportExcelFile,
  },
  methods: {
    addFile(file){
      this.currentFile = file;
      window.open(file)
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

.no-item-wrapper {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.v-card {
  width: 200px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;

  &__text {
    font-size: 20px;
    text-align: center;
  }
}

.content-wrapper {
  display: flex;
  width: 100%;
  margin: 20px;
}

.exchange-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 40px;

  & > svg {
    width: 30%;
    height: 30%;
  }
}

</style>
