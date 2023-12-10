import React from 'react';

const FilterForm = ({filterElements, setFilterElements, elementCount, setElementCount}) => {
    return (
        <div className={"flex justify-center items-center object-center"}>
            <input
                style={{width: '400px', padding: '10px', margin: '10px 0', fontSize: '16px'}}
                type="text"
                placeholder="Enter elements to filter, e.g., Pb,Te"
                value={filterElements}
                onChange={(e) => setFilterElements(e.target.value)}
            />
            <div className={"ml-6"}>
                Element count:
                {[2, 3, 4, 5, "all"].map(num => (
                    <label key={num} className={"ml-2"}>
                        <input
                            type="radio"
                            value={num}
                            checked={elementCount === num}
                            onChange={() => setElementCount(prev => (prev === num ? null : num))}
                        />
                        {num === 5 ? '5 or more' : num}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FilterForm;
