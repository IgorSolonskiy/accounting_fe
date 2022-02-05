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
import FileSaver from "file-saver";

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
    const url = '/textBook.xlsx';
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

      const exportData = [];


      const importDataRows = worksheet.getRows(startRowDate + 2, nextRowDate);
      importDataRows.forEach((row, index) => {

        if (!row.getCell("F").value || row.getCell("F").value?.startsWith("Акт" )) return null;

        const updatedCell = {};

        row.eachCell((cell) => {
          if (cell.address[0] === "F") {
            updatedCell.expendable = cell.value;
          }

          if (cell.address[0] === "A") {
            updatedCell.counterparty = cell.value;
          }

          if (cell.address[0] === "G") {
            updatedCell.sumRow = cell.value;
          }

          if (cell.address[0] === "H") {
            updatedCell.dateRow = cell.value;
          }

        });
        exportData.push(updatedCell);
      });

      const exportWorkbook = new Excel.Workbook();

      await exportWorkbook.xlsx.load(this.exportFile);

      const exportWorksheet = exportWorkbook.getWorksheet('Sheet1');

      const exportDataRows = exportWorksheet.getRows(7, exportData.length);
      // console.log(exportData)
      exportDataRows.forEach((row, index) => {
        row.getCell("A").value = 2 + index;
        row.getCell("B").value = moment(exportData[index].dateRow).format("DD.MM.YYYY");
        row.getCell("C").value = "Видаткова накл-на";
        row.getCell("D").value = moment(exportData[index].dateRow).format("DD.MM.YYYY");
        row.getCell("E").value = exportData[index].expendable;
        row.getCell("F").value = exportData[index].counterparty;
        row.getCell("G").value = exportData[index].sumRow.result;
        row.getCell("H").value = ""
        row.getCell("I").value = ""

        row.height = exportWorksheet.getRow(5).height;
        row.eachCell(cell=>{
          cell.style = exportWorksheet.getRow(5).getCell(cell.address[0]).style;
        })
      });

      exportWorkbook.xlsx.writeBuffer().then(function (data) {
        const blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
        FileSaver.saveAs(blob, 'report.xlsx');
      });

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