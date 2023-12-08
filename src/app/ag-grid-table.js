"use client";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, {useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
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
        {field: 'Composition'},
        {
            field: 'MaterialId',
            cellRenderer: (params) => (
                <div>
                    {params.value}
                    <a href="#" onClick={() => downloadCifFile(params.value)}
                       style={{color: 'blue', 'text-decoration': 'underline', 'margin-left': '4px'}}>
                        CIFF
                    </a>
                </div>
            )
        },
        {field: 'Reduced Formula'},
        {field: 'Elements'},
        {field: 'NSites'},
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
                console.info('The load has finished.')
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const downloadCifFile = (materialId) => {
        console.log('downloadCifFile')
        // ファイルのダウンロードURLを構築
        const fileUrl = `/by_id/${materialId}.cif`;

        // ファイルをダウンロードする
        axios({
            url: fileUrl,
            method: 'GET',
            responseType: 'blob', // 重要: レスポンスをBlobとして処理
        }).then((response) => {
            // ファイルダウンロードのためのリンクを作成
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${materialId}.cif`);
            document.body.appendChild(link);
            link.click();
        }).catch(error => console.error('Error downloading file:', error));
    };


    const inputStyle = {
        width: '300px',
        padding: '10px',
        margin: '10px 0',
        fontSize: '16px'
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer'
    };

    const gridStyle = {
        height: '70vh',
        width: '80vw',
        marginTop: '20px'
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


    return (
        <div>
            <div>
                <input
                    style={inputStyle}
                    type="text"
                    placeholder="Enter elements to filter, e.g., Na,Cl"
                    value={filterElements}
                    onChange={(e) => setFilterElements(e.target.value)}
                />
                <button style={buttonStyle} onClick={filterData}>Filter Data</button>
            </div>
            <div className="ag-theme-quartz" style={gridStyle}>
                <AgGridReact rowData={rowData} columnDefs={colDefs} pagination={true}/>
            </div>
        </div>
    );
};

