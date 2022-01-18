<template>
  <div class="import-wrapper">
    <h2>Import excel file</h2>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-file-input
          label="Excel"
          type="file"
          v-model="file"
          :rules="fileRules"
          @change="changeFile"
          outlined
          dense
      />
    </v-form>
  </div>
</template>

<script>
import * as Excel from 'exceljs';

export default {
  data: () => ({
    valid: true,
    file: null,
    fileRules: [
      file => {
        const validFormat = file?.name.match(/.*\.(xlsx|xls|csv)/i);

        if (!validFormat) return 'The file must be with xlsx or xls extension.';

        return true;
      },
    ],
  }),
  methods: {
    async changeFile(file) {
      const isValidFormat = this.$refs.form.validate();

      if (!isValidFormat) return null;

      const workbook = new Excel.Workbook();
      await workbook.xlsx.load(file);
      const worksheet = workbook.getWorksheet(1);
      const rows = worksheet.getRows(11, 20).filter(row => row.getCell(1).value);
      rows.forEach(row => {
        row.eachCell(cell => {
          // console.log(cell.value);
        });
      });

      this.$emit('addFile', file);
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