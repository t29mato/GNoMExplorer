import React from 'react';

const FilterForm = ({ filterElements, setFilterElements, filterData }) => {
    return (
        <div>
            <input
                style={{ width: '400px', padding: '10px', margin: '10px 0', fontSize: '16px' }}
                type="text"
                placeholder="Enter elements to filter, e.g., Pb,Te"
                value={filterElements}
                onChange={(e) => setFilterElements(e.target.value)}
            />
            {/*<button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }} onClick={filterData}>*/}
            {/*    Filter Data*/}
            {/*</button>*/}
        </div>
    );
};

export default FilterForm;
