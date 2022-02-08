export const filterByTableCreationDate = (row) => {
    const isNotValueFirstField = !row.getCell(1).value;
    const isNotValueSecondField = !row.getCell(2).value;
    const isValueThirdField = row.getCell(3).value;

    return isNotValueFirstField && isNotValueSecondField && isValueThirdField;
}