const filterData = (rowData, filterElements) => {
    if (!filterElements) return rowData;
    const elements = filterElements.split(',').map(el => el.trim());
    return rowData.filter(row => {
        let jsonStr = row.Elements.replace(/'/g, '"');
        return elements.every(el => JSON.parse(jsonStr).includes(el));
    });
};

export default filterData;
