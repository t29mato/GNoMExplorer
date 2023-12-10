import React from 'react';

const FilterForm = ({elements, setElements, elementCount, setElementCount}) => {
    return (
        <div className={"flex justify-center items-center"}>
            <input
                className={"w-96 p-2.5 my-2.5 text-base text-black"}
                type="text"
                placeholder="Enter elements to filter, e.g., Pb,Te"
                value={elements}
                onChange={(e) => setElements(e.target.value)}
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
