import * as Excel from "exceljs";

export const generateWorkbook = async ({indexOrNameSheet ='Расход'}) => {
    const workbook = new Excel.Workbook();

    await workbook.xlsx.load(this.file);

    const worksheet = workbook.getWorksheet(indexOrNameSheet);
    const numberRows = worksheet.lastRow.number;
    const firstRow = 1;
    const rows = worksheet.getRows(firstRow, numberRows);

    return {
        workbook,
        worksheet,
        rows
    }
}