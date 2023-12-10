const filterData = (rowData, filterElements, elementCount) => {
    return rowData.filter(row => {
        // Filter by elements
        let elementsMatch = true;
        if (filterElements) {
            const elements = filterElements.split(',').map(el => el.trim());
            let jsonStr = row.Elements.replace(/'/g, '"');
            elementsMatch = elements.every(el => {
                if (!el) return true;
                return JSON.parse(jsonStr).includes(el);
            });
        }

        // Filter by element count
        let elementCountMatch = true;
        if (elementCount !== null) {
            const elementCountInRecord = JSON.parse(row.Elements.replace(/'/g, '"')).length;
            if (elementCount === 5) {
                elementCountMatch = elementCountInRecord >= 5;
            } else {
                elementCountMatch = elementCountInRecord === elementCount;
            }
        }

        // Return true if row matches both filters
        return elementsMatch && elementCountMatch;
    });
};

export default filterData;
