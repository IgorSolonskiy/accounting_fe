<template>
  <main-layout>
    <import-excel-form @uploadFile="uploadFile" @datePicker="datePicker"/>
    <ExchangeIcon/>
    <export-excel-file v-if="currentFile && currentDate"/>
    <NoItemPlaceholder v-else-if="!currentFile" title="Please upload the file."/>
    <NoItemPlaceholder v-else title="Please select a date."/>
  </main-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import ImportExcelForm from '@/components/forms/ImportExcelForm.vue';
import ExportExcelFile from '@/components/forms/ExportExcelFile.vue';
import ExchangeIcon from '@/components/icons/ExchangeIcon.vue';
import NoItemPlaceholder from "@/components/cards/NoItemPlaceholder.vue";

export default Vue.extend({
  name: 'FileManipulation',
  data: () => ({
    currentFile: null,
    currentDate: null,
  }),
  components: {
    MainLayout,
    ImportExcelForm,
    ExportExcelFile,
    ExchangeIcon,
    NoItemPlaceholder
  },
  methods: {
    uploadFile(file: any) {
      this.currentFile = file;
    },
    datePicker(date: any) {
      this.currentDate = date;
    }
  }
})
</script>