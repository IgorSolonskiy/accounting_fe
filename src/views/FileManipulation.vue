<template>
  <div class="file-wrapper">
    <import-excel-form @uploadFile="uploadFile" @dataGenerationByDate="dataGenerationByDate"/>
    <ExchangeIcon/>
    <export-excel-file v-if="currentFile && exportData" :exportData="exportData"/>
    <NoItemPlaceholder v-else-if="!currentFile" title="Please upload the file."/>
    <NoItemPlaceholder v-else title="Please select a date."/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// COMPONENTS
import ImportExcelForm from '@/components/forms/ImportExcelForm.vue';
import ExportExcelFile from '@/components/forms/ExportExcelFile.vue';
import ExchangeIcon from '@/components/icons/ExchangeIcon.vue';
import NoItemPlaceholder from "@/components/cards/NoItemPlaceholder.vue";

export default Vue.extend({
  name: 'FileManipulation',
  data: () => ({
    currentFile: null,
    exportData: null,
  }),
  components: {
    ImportExcelForm,
    ExportExcelFile,
    ExchangeIcon,
    NoItemPlaceholder
  },
  methods: {
    uploadFile(file: any) {
      this.currentFile = file;
    },
    dataGenerationByDate(date: any) {
      this.exportData = date;
    }
  }
})
</script>

<style lang="scss">
.file-wrapper{
  display: flex;
  width: 100%;
}
</style>