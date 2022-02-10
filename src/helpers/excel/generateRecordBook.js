import * as Excel from "exceljs";
import moment from "moment";

export const generateRecordBook = async ({exportData, file}) => {
    const exportWorkbook = new Excel.Workbook();

    await exportWorkbook.xlsx.load(file);

    const exportWorksheet = exportWorkbook.getWorksheet('Книга облику');
    const exportDataRows = exportWorksheet.getRows(7, exportData.length);

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
        row.eachCell(cell => {
            cell.style = exportWorksheet.getRow(5).getCell(cell.address[0]).style;
        })
    });

    const bufferWorkbook = await exportWorkbook.xlsx.writeBuffer();

    return new Blob([bufferWorkbook], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
}