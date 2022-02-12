import * as Excel from "exceljs";
import moment from "moment";

export const generateRecordBook = async ({exportData, file, balanceDate, balanceLeft,fileName}) => {
    const exportWorkbook = new Excel.Workbook();

    await exportWorkbook.xlsx.load(file);

    const exportWorksheet = exportWorkbook.getWorksheet('Книга облику');
    const exportDataRows = exportWorksheet.getRows(7, exportData.length);

    //FILLING FIELD BY DEFAULT
    exportWorksheet.getRow(5).eachCell(cell => {
        if (cell.address.startsWith("B") || cell.address.startsWith("D")) {
            cell.value = moment(balanceDate).format("DD.MM.YYYY");
        }

        if (cell.address.startsWith("G")) {
            cell.value = balanceLeft;
        }
    })

    exportDataRows.forEach((row, index) => {
        row.getCell("A").value = 2 + index;
        row.getCell("B").value = moment(exportData[index].dateRow).format("DD.MM.YYYY");
        row.getCell("C").value = "Видаткова накл-на";
        row.getCell("D").value = moment(exportData[index].dateRow).format("DD.MM.YYYY");
        row.getCell("E").value = exportData[index].expendable;
        row.getCell("F").value = exportData[index].counterparty;
        row.getCell("G").value = exportData[index].sumRow.result || exportData[index].sumRow;
        row.getCell("H").value = ""
        row.getCell("I").value = ""

        const defaultCell = exportWorksheet.getRow(5);

        row.height = defaultCell.height;
        row.eachCell(cell => {
            cell.style = defaultCell.getCell(cell.address[0]).style;
        })
    });

    const bufferWorkbook = await exportWorkbook.xlsx.writeBuffer();

    return new Blob([bufferWorkbook], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
}