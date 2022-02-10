<template>
  <div class="import-wrapper">
    <h2>Import excel file</h2>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-file-input
          label="Please select an excel file."
          type="file"
          v-model="file"
          :rules="fileRules"
          @change="uploadFile"
          outlined
          dense
      />
      <div>
        <v-select @change="datePicker" :items="dates" label="Please select a book formation date."/>

      </div>
    </v-form>
  </div>
</template>

<script>
import * as Excel from 'exceljs';
import moment from 'moment';
import axios from 'axios';
import FileSaver from "file-saver";
import {generateDateRelativeFile} from "@/helpers/excel/generateDateRelativeFile";
import {generateWorkbook} from "@/helpers/excel/generateWorkbook";
import {filterByTableCreationDate} from "@/helpers/excel/filterByTableCreationDate";
import {generateOptionsRows} from "@/helpers/excel/generateOptionsRows";
import {generateExportData} from "@/helpers/excel/generateExportData";
import {generateRecordBook} from "@/helpers/excel/generateRecordBook";

export default {
  data: () => ({
    valid: true,
    file: null,
    exportFile: null,
    dates: [],
    fileRules: [
      file => {
        const validFormat = file?.name.match(/.*\.(xlsx|xls|csv)/i);

        if (!validFormat) return 'The file must be with xlsx or xls extension.';

        return true;
      },
    ],
  }),
  async created() {
    const {data} = await axios.get('/textBook.xlsx', {responseType: 'arraybuffer'});

    this.exportFile = data;
  },
  methods: {
    async uploadFile(file) {
      const isValidFormat = this.$refs.form.validate();
      const handlerSaveDates = date => this.dates.push(date);

      if (!isValidFormat) return null;

      await generateDateRelativeFile({startAddress: "C", handlerSaveDates, file})

      this.$emit('uploadFile', file);
    },
    async datePicker(date) {
      this.$emit('datePicker', date);

      // const {rows, worksheet} = await generateWorkbook({indexOrNameSheet: "Расход", file: this.file})
      // const rowsCreationDate = rows.filter(filterByTableCreationDate);
      // const {start, length} = generateOptionsRows({rows: rowsCreationDate, date});
      // const exportData = generateExportData({rows: worksheet.getRows(start, length)});
      // const blob = await generateRecordBook({exportData, file: this.exportFile});

      // FileSaver.saveAs(blob, 'RecordBook.xlsx');
    },
  },
};
</script>

<style>
.v-file-input {
  width: 100%;
}

.v-form {
  width: 100%;
}

.import-wrapper {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>