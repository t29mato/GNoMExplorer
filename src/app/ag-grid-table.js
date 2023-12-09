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
    const [isLoading, setIsLoading] = useState(true); // 追加: データ読み込み中の状態
    const [isFiltering, setIsFiltering] = useState(false); // 追加: フィルター実行中の状態


    // Column Definitions
    const colDefs = [
        {field: 'Composition'},
        {
            field: 'MaterialId',
            cellRenderer: (params) => (
                <div>
                    {params.value}
                    <a href={`https://storage.googleapis.com/gnome_stable_materials/by_id/${params.value}.CIF`}
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

    // Fetch data from CSV
    useEffect(() => {
        setIsLoading(true); // データ読み込み開始
        axios.get('/stable_materials_summary.csv')
            .then(response => {
                Papa.parse(response.data.trim(), {
                    header: true,
                    complete: (results) => {
                        setRowData(results.data);
                        setIsLoading(false); // データ読み込み完了
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false); // エラー時の処理
            });
    }, []);

    const downloadCifFile = (materialId) => {
        console.log('downloadCifFile')
        // ファイルのダウンロードURLを構築
        const fileUrl = `https://storage.googleapis.com/gnome_stable_materials/by_id/${materialId}.CIF`;

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
            link.setAttribute('download', `${materialId}.CIF`);
            document.body.appendChild(link);
            link.click();
        }).catch(error => console.error('Error downloading file:', error));
    };


    const inputStyle = {
        width: '400px',
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
        width: '100%',
        marginTop: '20px'
    };
    // Filter data based on user input
    // Filter data based on user input
    const filterData = () => {
        setIsFiltering(true); // フィルター実行開始
        const elements = filterElements.split(',').map(el => el.trim());
        const filteredData = rowData.filter(row => {
            let jsonStr = row.Elements.replace(/'/g, '"');
            return elements.every(el => JSON.parse(jsonStr).includes(el));
        });
        setRowData(filteredData);
        setIsFiltering(false); // フィルター実行完了
    };


    return (
        <div style={{width: '100%'}}>
            {isLoading && <p>Loading data...</p>} {/* データ読み込み中の表示 */}
            {!isLoading && (
                <div>
                    <div>
                        <input
                            style={inputStyle}
                            type="text"
                            placeholder="Enter elements to filter, e.g., Pb,Te"
                            value={filterElements}
                            onChange={(e) => setFilterElements(e.target.value)}
                        />
                        <button style={buttonStyle} onClick={filterData}>Filter Data</button>
                    </div>
                    <div className="ag-theme-quartz" style={gridStyle}>
                        <AgGridReact rowData={rowData} columnDefs={colDefs} pagination={true}/>
                    </div>
                    {isFiltering && <p>Filtering data...</p>} {/* フィルター実行中の表示 */}
                </div>
            )}

        </div>
    );
};

