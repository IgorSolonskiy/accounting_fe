<template>
  <main-layout>
    <import-excel-form @addFile="addFile"/>
    <ExchangeIcon/>
    <export-excel-file v-if="currentFile"/>
    <NoItemPlaceholder v-else title="Please upload the file."/>
  </main-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import MainLayout from '@/components/layouts/MainLayout'
import ImportExcelForm from '@/components/forms/ImportExcelForm';
import ExportExcelFile from '@/components/forms/ExportExcelFile';
import ExchangeIcon from '@/components/icons/ExchangeIcon';
import NoItemPlaceholder from "@/components/cards/NoItemPlaceholder";

export default Vue.extend({
  name: 'FileManipulation',
  data: () => ({
    currentFile: null,
  }),
  components: {
    MainLayout,
    ImportExcelForm,
    ExportExcelFile,
    ExchangeIcon,
    NoItemPlaceholder
  },
  methods: {
    addFile(file: any) {
      this.currentFile = file;
    },
  }
})
</script>