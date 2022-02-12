<template>
  <div class="export-wrapper">
    <h2>Export excel file</h2>
    <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="downloadFile"
        lazy-validation
    >
      <v-text-field
          label="File name"
          type="text"
          v-model="fileName"
          v-if="!loading"
          outlined
          dense
      />
      <div v-if="!loading" class="export-file">
        <v-text-field
            label="Quantity of goods left"
            type="number"
            class="export-file__quantity"
            v-model="balanceLeft"
            outlined
            dense
        />
        <v-text-field
            label="Product balance date"
            type="date"
            class="export-file__date"
            v-model="balanceDate"
            outlined
            dense
        />
      </div>
      <div v-if="loading" class="loader-wrapper">
        <clip-loader :size="'100px'"/>
      </div>
      <v-btn
          color="primary"
          elevation="4"
          height="40px"
          type="submit"
          :disabled="loading"
      >
        Save file
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import FileSaver from "file-saver";
// HELPERS
import {generateRecordBook} from "@/helpers/excel/generateRecordBook";
// COMPONENTS
import ClipLoader from 'vue-spinner/src/ClipLoader'

export default {
  components: {
    ClipLoader
  },
  data: () => ({
    valid: true,
    loading: false,
    fileName: 'Книга облику',
    balanceDate: "2021-03-22",
    balanceLeft: null,
  }),
  props: {
    exportData: Array,
  },
  methods: {
    async downloadFile() {
      this.loading = true;

      const {data: file} = await axios.get('/textBook.xlsx', {responseType: 'arraybuffer'});
      const blob = await generateRecordBook({
        exportData: this.exportData,
        balanceDate: this.balanceDate,
        balanceLeft: this.balanceLeft,
        file
      });

      FileSaver.saveAs(blob, `${this.fileName}.xlsx`);
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-file-input {
  width: 100%;
}

.v-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.export-wrapper {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.export-file {
  display: flex;
  justify-content: space-between;

  & > div {
    width: 45%;
    flex: 0 1 auto;
  }
}

.loader-wrapper {
  margin: 30px 0;
}
</style>