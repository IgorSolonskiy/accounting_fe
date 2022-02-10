// HELPERS
import {bookStructure} from "@/helpers/excel/fieldStructure";

export const generateExportData = ({rows}) => {
    const exportData = [];
    const {importStructure} = bookStructure;

    rows.forEach((row) => {
        const emptyValue = !row.getCell("F").value;
        const cellAct = String(row.getCell("F")?.value)?.startsWith("Акт");
        const structureKeys = Object.keys(importStructure);
        const updatedCell = {};

        if (emptyValue || cellAct) return null;

        row.eachCell((cell) => {
            structureKeys.forEach(key => {
                if (cell.address[0] === importStructure[key]) {
                    updatedCell[key] = cell.value
                }
            })
        });
        exportData.push(updatedCell);
    });

    return exportData;
}