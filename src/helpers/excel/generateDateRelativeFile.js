import * as Excel from "exceljs";
import moment from "moment";
// HELPERS
import {filterByTableCreationDate} from "@/helpers/excel/filterByTableCreationDate";
import {generateWorkbook} from "@/helpers/excel/generateWorkbook";

export const generateDateRelativeFile = async ({startAddress, handlerSaveDates}) => {
    const {rows} = generateWorkbook({indexOrNameSheet: "Расход"})

    const rowsCreationDate = rows.filter(filterByTableCreationDate);

    rowsCreationDate.forEach(row => {
        row.eachCell(cell => {
            if (!cell.address.startsWith(startAddress)) return null;

            const creationDate = moment(cell.value).format("DD.MM.YYYY");

            handlerSaveDates(creationDate);
        });
    });
}