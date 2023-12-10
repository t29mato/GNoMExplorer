import React from 'react';

const FilterForm = ({filterElements, setFilterElements, elementCount, setElementCount}) => {
    return (
        <div>
            <input
                style={{width: '400px', padding: '10px', margin: '10px 0', fontSize: '16px'}}
                type="text"
                placeholder="Enter elements to filter, e.g., Pb,Te"
                value={filterElements}
                onChange={(e) => setFilterElements(e.target.value)}
            />
            <div>
                {[2, 3, 4, 5].map(num => (
                    <label key={num}>
                        <input
                            type="radio"
                            value={num}
                            checked={elementCount === num}
                            onChange={() => setElementCount(num)}
                        />
                        {num === 5 ? '5 or more' : num}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FilterForm;
