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
  async created() {
    const {data} = await axios.get('/textBook.xlsx', {responseType: 'arraybuffer'});

    this.exportFile = data;
  },
  methods: {
    async changeFile(file) {
      const isValidFormat = this.$refs.form.validate();
      const handlerSaveDates = date => this.dates.push(date);

      if (!isValidFormat) return null;

      await generateDateRelativeFile({startAddress: "C", handlerSaveDates})

      this.$emit('addFile', file);
    },
    async changeDate(date) {
      const {rows, worksheet} = generateWorkbook({indexOrNameSheet: "Расход"})
      const rowsCreationDate = rows.filter(filterByTableCreationDate);
      const {start, length} = generateOptionsRows({rows: rowsCreationDate, date});
      const exportData = generateExportData({rows: worksheet.getRows(start, length)});

      //
      // const exportWorkbook = new Excel.Workbook();
      //
      // await exportWorkbook.xlsx.load(this.exportFile);
      //
      // const exportWorksheet = exportWorkbook.getWorksheet('Sheet1');
      //
      // const exportDataRows = exportWorksheet.getRows(7, exportData.length);
      // // console.log(exportData)
      // exportDataRows.forEach((row, index) => {
      //   row.getCell("A").value = 2 + index;
      //   row.getCell("B").value = moment(exportData[index].dateRow).format("DD.MM.YYYY");
      //   row.getCell("C").value = "Видаткова накл-на";
      //   row.getCell("D").value = moment(exportData[index].dateRow).format("DD.MM.YYYY");
      //   row.getCell("E").value = exportData[index].expendable;
      //   row.getCell("F").value = exportData[index].counterparty;
      //   row.getCell("G").value = exportData[index].sumRow.result;
      //   row.getCell("H").value = ""
      //   row.getCell("I").value = ""
      //
      //   row.height = exportWorksheet.getRow(5).height;
      //   row.eachCell(cell => {
      //     cell.style = exportWorksheet.getRow(5).getCell(cell.address[0]).style;
      //   })
      // });

      // exportWorkbook.xlsx.writeBuffer().then(function (data) {
      //   const blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      //   FileSaver.saveAs(blob, 'report.xlsx');
      // });

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