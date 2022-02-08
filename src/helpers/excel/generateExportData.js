export const generateExportData = ({rows}) => {
    const exportData = [];

    rows.forEach((row) => {

        if (!row.getCell("F").value || row.getCell("F").value?.startsWith("Акт")) return null;

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

    return exportData;
}