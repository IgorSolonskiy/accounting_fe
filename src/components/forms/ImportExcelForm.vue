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
          @change="changeFile"
          outlined
          dense
      />
      <div>
        <v-select @change="changeDate" :items="dates" label="Please select a book formation date."/>

      </div>
    </v-form>
  </div>
</template>

<script>
import * as Excel from 'exceljs';
import moment from 'moment';
import axios from 'axios';

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
    const url = '/ExampleBook.xlsx';
    const {data} = await axios.get(url, {responseType: 'arraybuffer'});

    this.exportFile = data;
  },
  methods: {
    async changeFile(file) {
      const isValidFormat = this.$refs.form.validate();

      if (!isValidFormat) return null;

      const workbook = new Excel.Workbook();
      await workbook.xlsx.load(file);
      const worksheet = workbook.getWorksheet('Расход');
      const numberRows = worksheet.lastRow.number;
      const firstRow = 1;

      const rows = worksheet.getRows(firstRow, numberRows)
          .filter(row => !row.getCell(1).value && !row.getCell(2).value && row.getCell(3).value);

      rows.forEach(row => {
        row.eachCell(cell => {
          if (!cell.address.startsWith('C')) return null;

          const tableCreated = moment(cell.value).subtract(10, 'days').calendar();

          this.dates.push(tableCreated);
        });
      });

      this.$emit('addFile', file);
    },
    async changeDate(date) {
      const workbook = new Excel.Workbook();
      await workbook.xlsx.load(this.file);
      const worksheet = workbook.getWorksheet('Расход');
      const numberRows = worksheet.lastRow.number;
      const firstRow = 1;

      const rows = worksheet.getRows(firstRow, numberRows)
          .filter(row => !row.getCell(1).value && !row.getCell(2).value && row.getCell(3).value);

      let startRowDate = null;
      let nextRowDate = null;

      rows.forEach(row => {

        row.eachCell(cell => {
          const tableCreated = moment(cell.value).subtract(10, 'days').calendar();

          if (startRowDate && !nextRowDate && cell.address.startsWith('C')) {
            nextRowDate = row.number - 1 - startRowDate;
          }

          if (!cell.address.startsWith('C') || tableCreated !== date) return null;

          startRowDate = row.number;

        });
      });

      const importRows = worksheet.getRows(startRowDate, nextRowDate);
      let importCounterpartyRow;
      let importExpendableNumber;
      let importSumRow;
      let importDateRow;

      importRows.forEach(row => {
        row.eachCell(cell => {
          if (cell.value === 'контрагент') {
            importCounterpartyRow = cell;
          }

          if (cell.value === '№ расх.н.') {
            importExpendableNumber = cell;
          }

          if (cell.value === 'Сумма') {
            importSumRow = cell;
          }

          if (cell.value === 'дата') {
            importDateRow = cell;
          }
        });
      });

      const exportWorkbook = new Excel.Workbook();

      await exportWorkbook.xlsx.load(this.exportFile);

      const exportWorksheet = workbook.getWorksheet('Книга облику');

      const importDataRows = worksheet.getRows(startRowDate + 2, nextRowDate);
      importDataRows.forEach((row,index) => {

        if (!row.getCell(importExpendableNumber.address[0]).value) return null;

        row.eachCell((cell) => {
          if (cell.address[0] === importExpendableNumber.address[0]) {
            console.log(cell.value, index)
          }
        });
      });

      // console.log(counterpartyRow, expendableNumber ,sumRow , dateRow)
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