"use client";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, {useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css';
import axios from "axios"; // Theme
import Papa from 'papaparse'; // papaparse for parsing CSV data

// Create new GridExample component
export const GridExample = () => {
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([]);
    const [filterElements, setFilterElements] = useState(''); // User input for elements to filter


    // Column Definitions
    const colDefs = [
        { field: 'Composition' },
        { field: 'MaterialId' },
        { field: 'Reduced Formula' },
        { field: 'Elements' },
        { field: 'NSites' },
        // ... Add more columns as needed ...
    ];

    // Fetch data from CSV
    useEffect(() => {
        axios.get('/stable_materials_summary.csv')
            .then(response => {
                Papa.parse(response.data, {
                    header: true,
                    preview: 100,
                    complete: (results) => {
                        setRowData(results.data);
                    }
                });
                console.info('The load has finished.')
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const gridStyle = {
        height: '100vh', // 例えば500pxの高さ
        width: '100vw' // 幅はコンテナに合わせる
    };

    // Filter data based on user input
    const filterData = () => {
        const elements = filterElements.split(',').map(el => el.trim());
        console.log({elements})
        console.log(rowData[0])
        const filteredData = rowData.filter(row => {
                let jsonStr = row.Elements.replace(/'/g, '"');
                return elements.every(el => {
                    console.log({el})
                    return JSON.parse(jsonStr).includes(el)
                })
            }
        );
        setRowData(filteredData);
    };


    // Container: Defines the grid's theme & dimensions.
    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Enter elements to filter, e.g., Na,Cl"
                    value={filterElements}
                    onChange={(e) => setFilterElements(e.target.value)}
                />
                <button onClick={filterData}>Filter Data</button>
            </div>
            <div style={gridStyle}>
                <AgGridReact rowData={rowData} columnDefs={colDefs} />
            </div>
        </div>
    );
};

