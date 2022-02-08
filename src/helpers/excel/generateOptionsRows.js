import moment from "moment";

export const generateOptionsRows = ({date, rows}) => {
    const optionsRows = {};

    rows.forEach(row => {
        row.eachCell(cell => {
            const tableCreated = moment(cell.value).format("DD.MM.YYYY");

            if (optionsRows.start && !optionsRows.length && cell.address.startsWith('C')) {
                optionsRows.length = row.number - 1 - optionsRows.start;
            }

            if (!cell.address.startsWith('C') || tableCreated !== date) return null;

            optionsRows.start = row.number + 2;
        });
    });

    return optionsRows;
}