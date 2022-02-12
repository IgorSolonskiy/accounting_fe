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
        <v-select @change="dataGenerationByDate" :items="dates" label="Please select a book formation date."/>

      </div>
    </v-form>
  </div>
</template>

<script>
// HELPERS
import {generateDateRelativeFile} from "@/helpers/excel/generateDateRelativeFile";
import {generateWorkbook} from "@/helpers/excel/generateWorkbook";
import {filterByTableCreationDate} from "@/helpers/excel/filterByTableCreationDate";
import {generateOptionsRows} from "@/helpers/excel/generateOptionsRows";
import {generateExportData} from "@/helpers/excel/generateExportData";

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
  methods: {
    async uploadFile(file) {
      const isValidFormat = this.$refs.form.validate();
      const handlerSaveDates = date => this.dates.push(date);

      if (!isValidFormat) return null;

      await generateDateRelativeFile({startAddress: "C", handlerSaveDates, file})

      this.$emit('uploadFile', file);
    },
    async dataGenerationByDate(date) {
      const {rows, worksheet} = await generateWorkbook({indexOrNameSheet: "Расход", file: this.file})
      const rowsCreationDate = rows.filter(filterByTableCreationDate);
      const {start, length} = generateOptionsRows({rows: rowsCreationDate, date});
      const exportData = generateExportData({rows: worksheet.getRows(start, length)});

      this.$emit("dataGenerationByDate", exportData)
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