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
                    complete: (results) => {
                        setRowData(results.data);
                    }
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const gridStyle = {
        height: '100vh', // 例えば500pxの高さ
        width: '100%' // 幅はコンテナに合わせる
    };

    // Container: Defines the grid's theme & dimensions.
    return (
        <div style={gridStyle}>
            <AgGridReact  rowData={rowData} columnDefs={colDefs} />
        </div>
    );
};

