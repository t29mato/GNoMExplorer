"use client";

import React, {useEffect, useState} from 'react';
import FilterForm from './FilterForm';
import Grid from './Grid';
import useCsvData from '../hooks/useCsvData';
import filterData from '../utils/filterData';
import {downloadCifFile} from "@/services/fileDownloadService";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

// Create new GridExample component
export const MainGrid = () => {
    const [rowData, isLoading] = useCsvData();
    const [elements, setElements] = useState('');
    const [filteredRowData, setFilteredRowData] = useState(rowData);
    const [elementCount, setElementCount] = useState("all");

    useEffect(() => {
        const filtered = filterData(rowData, elements, elementCount);
        setFilteredRowData(filtered);
    }, [rowData, elements, elementCount]);



    // Column Definitions
    const colDefs = [
        {field: 'Composition'},
        {
            field: 'MaterialId',
            cellRenderer: (params) => (
                <div>
                    {params.value}
                    <a href="#"
                       onClick={() => downloadCifFile(params.value)}
                       style={{color: 'blue', 'text-decoration': 'underline', 'margin-left': '4px'}}>
                        DL
                    </a>
                </div>
            )
        },
        {field: 'Reduced Formula'},
        {field: 'Elements'},
        {field: 'NSites'},
        {field: 'Volume'},
        {field: 'Density'},
        {field: 'Point Group'},
        {field: 'Space Group'},
        {field: 'Space Group Number'},
        {field: 'Crystal System'},
        {field: 'Corrected Energy'},
        {field: 'Formation Energy Per Atom'},
        {field: 'Decomposition Energy Per Atom'},
        {field: 'Dimensionality Cheon'},
        {field: 'Bandgap'},
        {field: 'Is Train'},
        {field: 'Decomposition Energy Per Atom All'},
        {field: 'Decomposition Energy Per Atom Relative'},
        {field: 'Decomposition Energy Per Atom MP'},
        {field: 'Decomposition Energy Per Atom MP OQMD'},
    ];

    return (
        <div style={{width: '100%'}}>
            {isLoading ? <p>Loading data...</p> : (
                <div>
                    <FilterForm
                        elements={elements}
                        setElements={setElements}
                        elementCount={elementCount}
                        setElementCount={setElementCount}
                        filterData={() => setFilteredRowData(filterData(rowData, elements, elementCount, setElementCount))}
                    />
                    {filteredRowData && <Grid rowData={filteredRowData} colDefs={colDefs} />}
                </div>
            )}
        </div>
    );
};

